const hre = require("hardhat");

async function main() {
  const Subalgo = await hre.ethers.getContractFactory("Subalgo");
  const subService = await Subalgo.deploy("Hello, Hardhat!");

  await subService.deployed();

  console.log("Greeter deployed to:", subService.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
