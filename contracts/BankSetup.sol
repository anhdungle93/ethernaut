pragma solidity 0.4.24;

import "./Bank.sol";
import "./WETH.sol";

contract BankSetup {
    WETH public weth;
    Bank public bank;
    
    constructor(address _weth) public payable {
        require(msg.value == 50 ether);
        weth = WETH(_weth);
        bank = new Bank();
        
        weth.deposit.value(msg.value)();
        weth.approve(address(bank), uint(-1));
        bank.depositToken(0, address(weth), weth.balanceOf(address(this)));
    }
    
    function isSolved() external view returns (bool) {
        return weth.balanceOf(address(bank)) == 0;
    }
}
