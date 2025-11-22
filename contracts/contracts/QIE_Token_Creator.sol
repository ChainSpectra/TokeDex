// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import the base ERC-20 implementation from OpenZeppelin
// NOTE: This library must be installed in your local development environment (e.g., via npm or foundry).
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ProjectCoin (QIE Token)
 * @dev This is a standard ERC-20 token contract for the Quantum Information Engineering project.
 * It inherits all required ERC-20 functions (transfer, balanceOf, approve, etc.)
 * and implements a fixed initial supply.
 */
contract ProjectCoin is ERC20 {
    // Defines the total number of tokens to be minted initially.
    // 1,000,000 tokens * 10^18 (due to the 18 decimals default)
    uint256 private constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    /**
     * @dev The constructor is run only once when the contract is deployed.
     * It calls the parent ERC20 constructor to set the token metadata,
     * and then mints the total supply to the contract deployer (msg.sender).
     */
    constructor() ERC20("Quantum Information Engineering", "QIE") {
        // The _mint function creates new tokens and assigns them to an address.
        // msg.sender is the address that deployed this contract.
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
