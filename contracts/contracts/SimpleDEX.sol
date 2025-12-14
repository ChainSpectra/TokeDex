// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SimpleDEX
 * @dev A simple AMM DEX for QIE Testnet supporting token swaps and liquidity pools
 * Inspired by Uniswap V2 but simplified for ease of use
 */
contract SimpleDEX is ReentrancyGuard {
    
    // Liquidity pool structure
    struct Pool {
        address tokenA;
        address tokenB;
        uint256 reserveA;
        uint256 reserveB;
        uint256 totalLiquidity;
        mapping(address => uint256) liquidity;
        bool exists;
    }
    
    // Pool ID = keccak256(abi.encodePacked(tokenA, tokenB)) where tokenA < tokenB
    mapping(bytes32 => Pool) public pools;
    
    // Array to track all pool IDs for enumeration
    bytes32[] private poolIds;
    
    // Events
    event PoolCreated(bytes32 indexed poolId, address indexed tokenA, address indexed tokenB);
    event LiquidityAdded(bytes32 indexed poolId, address indexed provider, uint256 amountA, uint256 amountB, uint256 liquidity);
    event LiquidityRemoved(bytes32 indexed poolId, address indexed provider, uint256 amountA, uint256 amountB, uint256 liquidity);
    event Swap(bytes32 indexed poolId, address indexed user, address tokenIn, uint256 amountIn, address tokenOut, uint256 amountOut);
    
    // Fee: 0.3% (30 basis points)
    uint256 public constant FEE_NUMERATOR = 997;
    uint256 public constant FEE_DENOMINATOR = 1000;
    
    /**
     * @dev Get pool ID for a token pair
     */
    function getPoolId(address tokenA, address tokenB) public pure returns (bytes32) {
        require(tokenA != tokenB, "Identical tokens");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        return keccak256(abi.encodePacked(token0, token1));
    }
    
    /**
     * @dev Get pool reserves
     */
    function getReserves(bytes32 poolId) external view returns (uint256 reserveA, uint256 reserveB) {
        Pool storage pool = pools[poolId];
        require(pool.exists, "Pool does not exist");
        return (pool.reserveA, pool.reserveB);
    }
    
    /**
     * @dev Get user's liquidity in a pool
     */
    function getUserLiquidity(bytes32 poolId, address user) external view returns (uint256) {
        return pools[poolId].liquidity[user];
    }
    
    /**
     * @dev Create a new liquidity pool and add initial liquidity
     */
    function createPool(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    ) external nonReentrant returns (bytes32 poolId) {
        require(tokenA != tokenB, "Identical tokens");
        require(amountA > 0 && amountB > 0, "Amounts must be > 0");
        
        poolId = getPoolId(tokenA, tokenB);
        require(!pools[poolId].exists, "Pool already exists");
        
        // Sort tokens
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        (uint256 amount0, uint256 amount1) = tokenA < tokenB ? (amountA, amountB) : (amountB, amountA);
        
        // Transfer tokens from user
        IERC20(token0).transferFrom(msg.sender, address(this), amount0);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);
        
        // Initialize pool
        Pool storage pool = pools[poolId];
        pool.tokenA = token0;
        pool.tokenB = token1;
        pool.reserveA = amount0;
        pool.reserveB = amount1;
        pool.exists = true;
        
        // Initial liquidity = sqrt(amountA * amountB)
        uint256 liquidity = sqrt(amount0 * amount1);
        pool.totalLiquidity = liquidity;
        pool.liquidity[msg.sender] = liquidity;
        
        emit PoolCreated(poolId, token0, token1);
        emit LiquidityAdded(poolId, msg.sender, amount0, amount1, liquidity);
        
        // Track pool ID for enumeration
        poolIds.push(poolId);
        
        return poolId;
    }
    
    /**
     * @dev Add liquidity to an existing pool
     */
    function addLiquidity(
        bytes32 poolId,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin
    ) external nonReentrant returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
        Pool storage pool = pools[poolId];
        require(pool.exists, "Pool does not exist");
        
        // Calculate optimal amounts
        uint256 amountBOptimal = quote(amountADesired, pool.reserveA, pool.reserveB);
        if (amountBOptimal <= amountBDesired) {
            require(amountBOptimal >= amountBMin, "Insufficient tokenB amount");
            (amountA, amountB) = (amountADesired, amountBOptimal);
        } else {
            uint256 amountAOptimal = quote(amountBDesired, pool.reserveB, pool.reserveA);
            require(amountAOptimal <= amountADesired && amountAOptimal >= amountAMin, "Insufficient tokenA amount");
            (amountA, amountB) = (amountAOptimal, amountBDesired);
        }
        
        // Transfer tokens
        IERC20(pool.tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(pool.tokenB).transferFrom(msg.sender, address(this), amountB);
        
        // Calculate liquidity to mint
        liquidity = min(
            (amountA * pool.totalLiquidity) / pool.reserveA,
            (amountB * pool.totalLiquidity) / pool.reserveB
        );
        require(liquidity > 0, "Insufficient liquidity minted");
        
        // Update pool state
        pool.reserveA += amountA;
        pool.reserveB += amountB;
        pool.totalLiquidity += liquidity;
        pool.liquidity[msg.sender] += liquidity;
        
        emit LiquidityAdded(poolId, msg.sender, amountA, amountB, liquidity);
    }
    
    /**
     * @dev Remove liquidity from a pool
     */
    function removeLiquidity(
        bytes32 poolId,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin
    ) external nonReentrant returns (uint256 amountA, uint256 amountB) {
        Pool storage pool = pools[poolId];
        require(pool.exists, "Pool does not exist");
        require(pool.liquidity[msg.sender] >= liquidity, "Insufficient liquidity");
        
        // Calculate amounts to return
        amountA = (liquidity * pool.reserveA) / pool.totalLiquidity;
        amountB = (liquidity * pool.reserveB) / pool.totalLiquidity;
        
        require(amountA >= amountAMin && amountB >= amountBMin, "Insufficient output amount");
        
        // Update pool state
        pool.liquidity[msg.sender] -= liquidity;
        pool.totalLiquidity -= liquidity;
        pool.reserveA -= amountA;
        pool.reserveB -= amountB;
        
        // Transfer tokens back to user
        IERC20(pool.tokenA).transfer(msg.sender, amountA);
        IERC20(pool.tokenB).transfer(msg.sender, amountB);
        
        emit LiquidityRemoved(poolId, msg.sender, amountA, amountB, liquidity);
    }
    
    /**
     * @dev Swap tokens
     */
    function swap(
        bytes32 poolId,
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMin
    ) external nonReentrant returns (uint256 amountOut) {
        Pool storage pool = pools[poolId];
        require(pool.exists, "Pool does not exist");
        require(tokenIn == pool.tokenA || tokenIn == pool.tokenB, "Invalid token");
        require(amountIn > 0, "Amount must be > 0");
        
        bool isTokenA = tokenIn == pool.tokenA;
        address tokenOut = isTokenA ? pool.tokenB : pool.tokenA;
        uint256 reserveIn = isTokenA ? pool.reserveA : pool.reserveB;
        uint256 reserveOut = isTokenA ? pool.reserveB : pool.reserveA;
        
        // Calculate output amount with 0.3% fee
        amountOut = getAmountOut(amountIn, reserveIn, reserveOut);
        require(amountOut >= amountOutMin, "Insufficient output amount");
        require(amountOut < reserveOut, "Insufficient liquidity");
        
        // Transfer tokens
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(msg.sender, amountOut);
        
        // Update reserves
        if (isTokenA) {
            pool.reserveA += amountIn;
            pool.reserveB -= amountOut;
        } else {
            pool.reserveB += amountIn;
            pool.reserveA -= amountOut;
        }
        
        emit Swap(poolId, msg.sender, tokenIn, amountIn, tokenOut, amountOut);
    }
    
    /**
     * @dev Calculate output amount for a swap (with 0.3% fee)
     */
    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256 amountOut) {
        require(amountIn > 0, "Insufficient input amount");
        require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity");
        
        uint256 amountInWithFee = amountIn * FEE_NUMERATOR;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * FEE_DENOMINATOR) + amountInWithFee;
        amountOut = numerator / denominator;
    }
    
    /**
     * @dev Quote amount B for amount A given reserves
     */
    function quote(uint256 amountA, uint256 reserveA, uint256 reserveB) public pure returns (uint256 amountB) {
        require(amountA > 0, "Insufficient amount");
        require(reserveA > 0 && reserveB > 0, "Insufficient liquidity");
        amountB = (amountA * reserveB) / reserveA;
    }
    
    /**
     * @dev Square root function (Babylonian method)
     */
    function sqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
    
    /**
     * @dev Return minimum of two numbers
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
    
    // ============ Pool Enumeration Functions ============
    // These functions enable pool discovery and analytics (Phase 1-3)
    
    /**
     * @dev Get total number of pools
     * @return Total count of created pools
     */
    function getPoolCount() external view returns (uint256) {
        return poolIds.length;
    }
    
    /**
     * @dev Get all pool IDs
     * @return Array of all pool IDs
     * Note: For large numbers of pools, consider pagination in frontend
     */
    function getAllPoolIds() external view returns (bytes32[] memory) {
        return poolIds;
    }
    
    /**
     * @dev Get pool IDs with pagination
     * @param offset Starting index
     * @param limit Number of pools to return
     * @return Array of pool IDs for the requested range
     * Future-compatible for Phase 2/3 when many pools exist
     */
    function getPoolIdsPaginated(uint256 offset, uint256 limit) external view returns (bytes32[] memory) {
        require(offset < poolIds.length, "Offset out of bounds");
        
        uint256 end = offset + limit;
        if (end > poolIds.length) {
            end = poolIds.length;
        }
        
        bytes32[] memory result = new bytes32[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = poolIds[i];
        }
        
        return result;
    }
    
    /**
     * @dev Get detailed pool information
     * @param poolId The pool ID to query
     * @return tokenA First token address
     * @return tokenB Second token address
     * @return reserveA Reserve amount of token A
     * @return reserveB Reserve amount of token B
     * @return totalLiquidity Total liquidity in the pool
     * @return exists Whether the pool exists
     */
    function getPoolInfo(bytes32 poolId) external view returns (
        address tokenA,
        address tokenB,
        uint256 reserveA,
        uint256 reserveB,
        uint256 totalLiquidity,
        bool exists
    ) {
        Pool storage pool = pools[poolId];
        return (
            pool.tokenA,
            pool.tokenB,
            pool.reserveA,
            pool.reserveB,
            pool.totalLiquidity,
            pool.exists
        );
    }
    
    /**
     * @dev Get multiple pool infos in one call
     * @param poolIdList Array of pool IDs to query
     * @return tokenAs Array of token A addresses
     * @return tokenBs Array of token B addresses
     * @return reserveAs Array of reserve A amounts
     * @return reserveBs Array of reserve B amounts
     * @return totalLiquidities Array of total liquidity amounts
     * Note: Gas-efficient for Phase 2/3 analytics
     */
    function getMultiplePoolInfos(bytes32[] calldata poolIdList) external view returns (
        address[] memory tokenAs,
        address[] memory tokenBs,
        uint256[] memory reserveAs,
        uint256[] memory reserveBs,
        uint256[] memory totalLiquidities
    ) {
        uint256 length = poolIdList.length;
        tokenAs = new address[](length);
        tokenBs = new address[](length);
        reserveAs = new uint256[](length);
        reserveBs = new uint256[](length);
        totalLiquidities = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            Pool storage pool = pools[poolIdList[i]];
            tokenAs[i] = pool.tokenA;
            tokenBs[i] = pool.tokenB;
            reserveAs[i] = pool.reserveA;
            reserveBs[i] = pool.reserveB;
            totalLiquidities[i] = pool.totalLiquidity;
        }
        
        return (tokenAs, tokenBs, reserveAs, reserveBs, totalLiquidities);
    }
    
    /**
     * @dev Check if a pool exists for a token pair
     * @param tokenA First token address
     * @param tokenB Second token address
     * @return exists Whether the pool exists
     * @return poolId The pool ID if it exists
     */
    function poolExists(address tokenA, address tokenB) external view returns (bool exists, bytes32 poolId) {
        poolId = getPoolId(tokenA, tokenB);
        exists = pools[poolId].exists;
        return (exists, poolId);
    }
}

