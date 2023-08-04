
const hre = require("hardhat");

async function main() {
  console.log("Deploying Factory contracts");
  const create2 = await hre.ethers.deployContract("Create2");
  await create2.waitForDeployment();
  const address = await create2.getAddr(2);
  console.log(
    "Deployed contract now deploying the second contract on address",
    address
  );

   await create2.DeployViaCreate2(2);

  console.log("expected:",address, "Deployed on:",await create2.ContractDeployedOn());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
