const chai = require("chai");
let expect = chai.expect;
const { ethers } = require("hardhat");
const { deployContract, MockProvider, solidity } = require("ethereum-waffle");
chai.use(solidity);
const ERC721NFT_Simple  = require("../frontend/src/artifacts/contracts/ERC721NFT_Simple.sol/ERC721NFT_Simple.json");

describe("ERC721NFT_Simple", async function () {
    const [wallet, walletTo] = new MockProvider().getWallets();

    let ERC721NFTToken;
    let token;
    let deployedToken;
    let tokenSupply;
    let mintEnabledLog;

    beforeEach(async () => {
        token = await deployContract(wallet, ERC721NFT_Simple, ["Dogies", "DOG"]);
    });

    it('Enables contract minting', async () => {
        statusToggle = await token.isMintEnabled();

        // Tx Check
        expect(statusToggle).to.be.a('object');

        // Event Check
        mintEnabledLog = await token.queryFilter("MintEnabledLog");
        statusToggleLog = await mintEnabledLog[0].args[mintEnabledLog[0].args.length -1];

        console.log("statusToggleLog : true = ", statusToggleLog);
        expect(statusToggleLog).to.be.a('boolean');
        expect(statusToggleLog).to.equal(true);
        expect(statusToggle).to.emit(token, "MintEnabledLog").withArgs(wallet.address, true);

    });


})