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

    const CompositeCallFactory = await ethers.getContractFactory("CompositeCall");
    const CompositeCallInstance = await CompositeCallFactory.deploy();

    console.log(`CompositeCall instance address ${CompositeCallInstance.address}`);

    
    await sleep(90);
    await hre.run("verify:verify", {
        address: CompositeCallInstance.address,
        constructorArguments: [],
    })
    

}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });