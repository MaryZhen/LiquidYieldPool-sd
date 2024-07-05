// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract C2MToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply)
        ERC20(name, symbol) {
            _mint(msg.sender, initialSupply);
        }
}