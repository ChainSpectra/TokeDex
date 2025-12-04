// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title QuickTestToken (QTT)
 * @dev ERC-20 token for testing TokeDex on QIE Testnet
 * Total Supply: 10,000 QTT
 * Used for DEX testing and trading simulations
 */
contract QuickTestToken is ERC20, Ownable {
    // Total supply: 10,000 tokens with 18 decimals
    uint256 private constant TOTAL_SUPPLY = 10_000 * 10**18;

    /**
     * @dev Constructor mints entire supply to contract deployer
     * The deployer will then transfer tokens to the faucet contract
     */
    constructor() ERC20("QuickTestToken", "QTT") Ownable(msg.sender) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    /**
     * @dev Returns the number of decimals (18 - standard for ERC20)
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
