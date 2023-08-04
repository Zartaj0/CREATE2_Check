const hre = require("hardhat");

/*
This script is showing that the contract nonce only when deploying another
contract from it either using CREATE2 or CREATE. 
The nonce doesn't increase while calling any write functions from the contract.
At that time, only wallet nonce increases.
*/

async function main() {
  const signer = await ethers.provider.getSigner();
  console.log(
    "Wallet nonce before deploying:",
    await ethers.provider.getTransactionCount(signer.address)
  );
  console.log("Deploying Factory contracts");
  const create2 = await hre.ethers.deployContract("Create2");
  await create2.waitForDeployment();
  console.log(
    "contract nonce before CREATE2",
    await ethers.provider.getTransactionCount(create2.target)
  );
  console.log(
    "Wallet nonce after deploying:",
    await ethers.provider.getTransactionCount(signer.address)
  );
  const address = await create2.getAddr(2);
  console.log(
    "Deployed contract now deploying the second contract on address",
    address
  );

  await create2.DeployViaCreate2(2);
  console.log(
    "contract nonce after CREATE2",
    await ethers.provider.getTransactionCount(create2.target)
  );
  console.log(
    "Wallet nonce after CREATE2:",
    await ethers.provider.getTransactionCount(signer.address)
  );
  await create2.DeployViaCreate();
  console.log(
    "contract nonce after CREATE",
    await ethers.provider.getTransactionCount(create2.target)
  );
  console.log(
    "Wallet nonce after CREATE:",
    await ethers.provider.getTransactionCount(signer.address)
  );

  const write = await hre.ethers.deployContract("Write");
  await write.waitForDeployment();

  await create2.write(write.target);

  console.log(
    "contract nonce after WRITING",
    await ethers.provider.getTransactionCount(create2.target)
  );
  console.log(
    "Wallet nonce after WRITING:",
    await ethers.provider.getTransactionCount(signer.address)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
