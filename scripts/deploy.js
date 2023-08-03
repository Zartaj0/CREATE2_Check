// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  console.log("Deploying Factory contracts");
  const create2 = await hre.ethers.deployContract("Create2");
  await create2.waitForDeployment();
  const address = await create2.getAddr();
  console.log(
    "Deployed contract now deploying the second contract on address",
    address
  );

  const tx = await create2.Deploy();

  console.log("expected:",address, "Deployed on:",await create2.ContractDeployedOn());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
