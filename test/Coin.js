const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Coin", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Coin = await ethers.getContractFactory("Coin");
    const coin = await Coin.deploy();
    await coin.deployed();

    expect(await coin.mint()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
