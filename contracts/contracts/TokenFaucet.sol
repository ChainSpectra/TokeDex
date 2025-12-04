// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenFaucet
 * @dev Distributes QTT tokens to users with rate limiting
 * - 100 QTT per claim
 * - 24-hour cooldown between claims
 * - Owner can refill the faucet
 */
contract TokenFaucet is Ownable, ReentrancyGuard {
    // The token being distributed
    IERC20 public token;

    // Amount of tokens to give per claim (100 QTT)
    uint256 public constant CLAIM_AMOUNT = 100 * 10**18;

    // Cooldown period (24 hours in seconds)
    uint256 public constant COOLDOWN_PERIOD = 24 hours;

    // Mapping to track last claim time for each address
    mapping(address => uint256) public lastClaimTime;

    // Events
    event TokensClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event FaucetRefilled(address indexed owner, uint256 amount);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    /**
     * @dev Constructor sets the token address
     * @param _tokenAddress Address of the QTT token contract
     */
    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }

    /**
     * @dev Allows users to claim tokens
     * Requirements:
     * - User must wait 24 hours between claims
     * - Faucet must have sufficient balance
     */
    function claimTokens() external nonReentrant {
        require(canClaim(msg.sender), "Must wait 24 hours between claims");
        require(token.balanceOf(address(this)) >= CLAIM_AMOUNT, "Faucet is empty");

        // Update last claim time
        lastClaimTime[msg.sender] = block.timestamp;

        // Transfer tokens to user
        require(token.transfer(msg.sender, CLAIM_AMOUNT), "Token transfer failed");

        emit TokensClaimed(msg.sender, CLAIM_AMOUNT, block.timestamp);
    }

    /**
     * @dev Check if an address can claim tokens
     * @param _address Address to check
     * @return bool True if address can claim
     */
    function canClaim(address _address) public view returns (bool) {
        // First-time claimers can claim immediately
        if (lastClaimTime[_address] == 0) {
            return true;
        }
        
        // Check if cooldown period has passed
        return block.timestamp >= lastClaimTime[_address] + COOLDOWN_PERIOD;
    }

    /**
     * @dev Get time remaining until next claim
     * @param _address Address to check
     * @return uint256 Seconds remaining (0 if can claim now)
     */
    function timeUntilNextClaim(address _address) external view returns (uint256) {
        if (canClaim(_address)) {
            return 0;
        }
        
        uint256 nextClaimTime = lastClaimTime[_address] + COOLDOWN_PERIOD;
        return nextClaimTime - block.timestamp;
    }

    /**
     * @dev Get faucet balance
     * @return uint256 Current token balance of faucet
     */
    function getFaucetBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    /**
     * @dev Owner can refill the faucet
     * @param _amount Amount of tokens to add
     */
    function refillFaucet(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );

        emit FaucetRefilled(msg.sender, _amount);
    }

    /**
     * @dev Owner can withdraw tokens from faucet (emergency only)
     * @param _amount Amount of tokens to withdraw
     */
    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(token.balanceOf(address(this)) >= _amount, "Insufficient balance");
        
        require(token.transfer(msg.sender, _amount), "Token transfer failed");

        emit TokensWithdrawn(msg.sender, _amount);
    }

    /**
     * @dev Get number of claims remaining in faucet
     * @return uint256 Number of 100 QTT claims available
     */
    function getClaimsRemaining() external view returns (uint256) {
        return token.balanceOf(address(this)) / CLAIM_AMOUNT;
    }
}
