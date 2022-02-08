require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan"); 
require("@nomiclabs/hardhat-ethers");
require("hardhat-contract-sizer");


const { utils } = require("ethers");
/* const { sleep } = require("./scripts/helpers"); */

module.exports = {
  solidity:{
    compilers: [
        {
            version: "0.6.0",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 25
                }
            }
        },
        {
            version: "0.7.6",
        },
        {
            version: "0.4.24",
        },
        ],   
    },
  networks: {
    rinkeby: {
        url: process.env.RinkebyInfuraAPI,
        accounts: [ process.env.RinkebyWhiteLabelDeployerPrivateKey ],
        },
    milkomedaTestnet: {
        url: process.env.MilkomedaTestnetAPI,
        accounts: [ process.env.MilkomedaTestnetDeployerPrivateKey ],
        },
    "arbitrum-rinkeby": {
        url: 'https://rinkeby.arbitrum.io/rpc',
        accounts: [ process.env.RinkebyWhiteLabelDeployerPrivateKey ]
        }
    },
    
    etherscan: {
        apiKey: process.env.EtherscanApiKey,
    }
};


