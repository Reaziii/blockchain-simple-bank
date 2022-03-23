const UPAY = artifacts.require("UPAY");

contract("SimpleStorage",async (accounts) => {
  const ssContract = await UPAY.deployed();

  it("it should create a new user", async () => {
    const bobNum = await ssContract.createAccount.call("reaz ahammed");
    let myName = await ssContract.getMyName.call();
    let myaddress = "0xdf12Bbdd375a1Cb617ad5934B0d9E942c6741995";
    let address = await ssContract.getMyAddress.call();
    assets.equal(myaddress,address);
    assert.equal(myName, "reaz ahammed");
  });
});
