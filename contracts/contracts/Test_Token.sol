// contracts/TestToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20, Ownable {
    constructor() ERC20("QuickTestToken", "QTT") {
        // Mint a small supply to the contract deployer (your wallet)
        _mint(msg.sender, 1000 * 10**decimals()); 
    }
}