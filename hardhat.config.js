require("@nomiclabs/hardhat-waffle");
// require("hardhat-typechain");
// require("@nomiclabs/hardhat-web3");

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
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/776475786d31423ea8f833fca00bfbd4",
      //accounts: [`0x${process,env.ACCOUNT_KEY}`]
      accounts: [`0xf8684e0675c0f9f0f05c4098bdfd1220216f6596b8b3344d333bc0ce01b4e07d`]
    },
  },
};
