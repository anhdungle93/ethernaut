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

    contractAddress = "0xf74a463BDFa273775446271FF5Fb2C064D2416dd";

    const provider = ethers.provider;
    console.log(await provider.getStorageAt(contractAddress, 0));
    console.log(await provider.getStorageAt(contractAddress, 2));
    console.log(await provider.getStorageAt(contractAddress, 3));
    console.log(await provider.getStorageAt(contractAddress, 4));
    console.log(await provider.getStorageAt(contractAddress, 5));
    console.log(await provider.getStorageAt(contractAddress, 6));
    console.log(await provider.getStorageAt(contractAddress, 7));
    console.log(await provider.getStorageAt(contractAddress, 8));
    console.log(await provider.getStorageAt(contractAddress, 9));
    console.log(await provider.getStorageAt(contractAddress, 10));




}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });