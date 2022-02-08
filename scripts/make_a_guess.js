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

    const GuessFactory = await ethers.getContractFactory("Guess");
    const GuessInstance = await GuessFactory.attach("0xc30a54A660D0f986C3AD211c521C0E26e6978014");

    const CoinFlipFactory = await ethers.getContractFactory("CoinFlip");
    const CoinFlipInstance = await CoinFlipFactory.attach("0xF4f95F0Eb85ac7e69A1D32BcA05e655A1f42a22F");

    for (let i = 0; i < 10; i++) {
        console.log(`guess ${i}`);
        console.log(`Number of correct guesses is ${await CoinFlipInstance.consecutiveWins()}`);
        await GuessInstance.guess();
        await sleep(20);
    }

    console.log(`Number of correct guesses is ${await CoinFlipInstance.consecutiveWins()}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });