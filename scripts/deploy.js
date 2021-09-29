// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const beltFarm = "0xD4BbC80b9B102b77B21A06cb77E954049605E6c1";
  const beltBNB = "0xa8Bb71facdd46445644C277F9499Dd22f6F0A30C";

  
  // We get the contract to deploy
  const CzfBeltVault = await hre.ethers.getContractFactory("CzfBeltVault");
  const czfBeltVault = await CzfBeltVault.deploy(beltFarm, beltBNB);

  await czfBeltVault.deployed();

  console.log("CzfBeltVault deployed to:", czfBeltVault.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
