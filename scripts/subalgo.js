const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  const Subalgo = await hre.ethers.getContractFactory("Subalgo");
  const subService = await Subalgo.deploy("Im SubAlgo_testing");
  await subService.deployed();
  console.log("Subalgo deployed to:", subService.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
