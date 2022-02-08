const hre = require("hardhat");
const {utils} = require("ethers");

function sleep(s) {
    if (s > 0) {
        console.log(`Waiting for ${s} seconds`);
        return new Promise(resolve => setTimeout(resolve, s*1000));
    }
}

async function main() {


    console.log(`Operating in network ${hre.network.name}`)

    const [deployer, user] = await hre.ethers.getSigners();

    let holder = deployer.address;

    console.log(
    "Deploying contracts with the account:",
    deployer.address
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("User balance:", (await user.getBalance()).toString());

    const WETHFactory = await ethers.getContractFactory("WETH");
    const WETHInstance = await WETHFactory.deploy();
    const WETHInstance2 = await WETHFactory.deploy();

    const bankSetupFactory = await ethers.getContractFactory("BankSetup");
    const bankSetupInstance = await bankSetupFactory.deploy(WETHInstance.address, {value: utils.parseEther("50")});

    const bankAddress = await bankSetupInstance.bank();
    console.log(`bank address is ${bankAddress}`);

    const bankFactory = await ethers.getContractFactory("Bank");
    const bankInstance = await bankFactory.attach(bankAddress);
    
    await WETHInstance.connect(user).deposit({value: utils.parseEther("100")});

    const bankInstance.depositToken()

    

}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });