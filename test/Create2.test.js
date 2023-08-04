const { expect } = require("chai");

describe("CREATE2", function () {
  let contract;
  beforeEach(async () => {
    console.log("deploying factory contract");
    contract = await ethers.deployContract("Create2");
    contract.waitForDeployment();
    console.log("deployed on", contract.target);
  });
  it("Should deploy on same address as computed", async () => {
    const computed = await contract.getAddr(4);
    console.log("precomuted address is", computed);
    console.log("now deploying via CREATE2");

    var tx = await contract.DeployViaCreate2(4);

    await expect(tx).to.emit(contract, "Deployed").withArgs(computed);
  });
});
