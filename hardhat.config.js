require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
/**
 * @path set to /src folder where front-end will live in order to have easy access to connecting to front-end.
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API,
      accounts: [
        process.env.SIGNER_CONTRACT_DEPLOY, 
        process.env.SIGNER_TXN_ONE
      ]
    }
  },
  paths: {
    artifacts: './frontend/src/artifacts'
  }
};
