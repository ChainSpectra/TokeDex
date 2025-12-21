// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FractionToken
 * @dev ERC20 token representing fractional ownership of an NFT
 */
contract FractionToken is ERC20, Ownable {
    address public vault;
    uint256 public vaultId;
    
    event TokensBurned(address indexed burner, uint256 amount);
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address recipient,
        address _vault,
        uint256 _vaultId
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(totalSupply > 0, "Total supply must be > 0");
        require(recipient != address(0), "Invalid recipient");
        require(_vault != address(0), "Invalid vault");
        
        vault = _vault;
        vaultId = _vaultId;
        
        _mint(recipient, totalSupply * 10**decimals());
    }
    
    /**
     * @dev Burn tokens (for redemption)
     * @param amount Amount to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    /**
     * @dev Burn tokens from address (with approval)
     * @param account Address to burn from
     * @param amount Amount to burn
     */
    function burnFrom(address account, uint256 amount) external {
        uint256 currentAllowance = allowance(account, msg.sender);
        require(currentAllowance >= amount, "Burn amount exceeds allowance");
        
        _approve(account, msg.sender, currentAllowance - amount);
        _burn(account, amount);
        
        emit TokensBurned(account, amount);
    }
}
