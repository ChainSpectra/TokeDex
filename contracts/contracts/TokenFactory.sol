// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CustomToken
 * @dev ERC20 token that can be created by the TokenFactory
 */
contract CustomToken is ERC20 {
    uint8 private _decimals;
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 tokenDecimals,
        address creator
    ) ERC20(name, symbol) {
        _decimals = tokenDecimals;
        _mint(creator, initialSupply * 10 ** tokenDecimals);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}

/**
 * @title TokenFactory
 * @dev Factory contract that deploys new ERC20 tokens on-demand
 * This allows businesses to create their own tokens through TokeDex
 */
contract TokenFactory {
    // Track all created tokens
    address[] public createdTokens;
    mapping(address => address[]) public creatorToTokens;
    
    // Events
    event TokenCreated(
        address indexed tokenAddress,
        address indexed creator,
        string name,
        string symbol,
        uint256 initialSupply,
        uint8 decimals
    );
    
    /**
     * @dev Creates a new ERC20 token
     * @param name Token name (e.g., "My Business Token")
     * @param symbol Token symbol (e.g., "MBT")
     * @param initialSupply Initial token supply (will be multiplied by 10^decimals)
     * @param decimals Number of decimal places (usually 18)
     * @return address The address of the newly created token
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals
    ) external returns (address) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(initialSupply > 0, "Initial supply must be greater than 0");
        require(decimals <= 18, "Decimals must be <= 18");
        
        // Deploy new token contract
        CustomToken newToken = new CustomToken(
            name,
            symbol,
            initialSupply,
            decimals,
            msg.sender // The creator receives all initial tokens
        );
        
        address tokenAddress = address(newToken);
        
        // Track the created token
        createdTokens.push(tokenAddress);
        creatorToTokens[msg.sender].push(tokenAddress);
        
        emit TokenCreated(
            tokenAddress,
            msg.sender,
            name,
            symbol,
            initialSupply,
            decimals
        );
        
        return tokenAddress;
    }
    
    /**
     * @dev Get all tokens created by a specific address
     */
    function getTokensByCreator(address creator) external view returns (address[] memory) {
        return creatorToTokens[creator];
    }
    
    /**
     * @dev Get total number of tokens created
     */
    function getTotalTokensCreated() external view returns (uint256) {
        return createdTokens.length;
    }
    
    /**
     * @dev Get all created tokens
     */
    function getAllTokens() external view returns (address[] memory) {
        return createdTokens;
    }
}
