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

    const [deployer] = await hre.ethers.getSigners();

    let holder = deployer.address;

    console.log(
    "Deploying contracts with the account:",
    deployer.address
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const SelfdestructFactory = await ethers.getContractFactory("Selfdestruct");
    const SelfdestructInstance = await SelfdestructFactory.deploy();

    await deployer.sendTransaction({
        to: SelfdestructInstance.address,
        value: ethers.utils.parseEther("0.0000000001"),
        gasLimit: 1000000
    });

    await sleep(30);
    const provider = ethers.provider;
    console.log("Contract balance:", await provider.getBalance(SelfdestructInstance.address));


    
    await sleep(30);
    await SelfdestructInstance.attack();

}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });