const chai = require("chai");
let expect = chai.expect;
const { ethers } = require("hardhat");
const { deployContract, MockProvider, solidity } = require("ethereum-waffle");
chai.use(solidity);
const ERC1155Token  = require("../frontend/src/artifacts/contracts/ERC1155/ERC1155Token.json");

describe("ERC1155Token", async function () {
    const provider = new MockProvider();
    const [wallet, otherWallet] = provider.getWallets();
    console.log('wallet: ', wallet.address);
    // const add1 = await provider.getBalance(wallet);
    // console.log('wallet (balance): ', add1);
    console.log('otherWallet: ',otherWallet.address);


    let ERC721NFTToken;
    let contract;
    let deployedNFTContract;
    let deployedToken;
    let tokenSupply;
    let mintEnabledLog;
    let mintItemTxn;

    beforeEach(async () => {
        contract = await deployContract(wallet, ERC1155Token, ["Dogies", "DOG"]);
        // console.log(await contract.getBalance());
        deployedNFTContract = await hre.ethers.getContractAt("ERC1155Token", contract.address, otherWallet);
        
    });

    /*      Enables contract minting       */
    it('Enables contract minting', async () => {
        
        // Enable minting
        statusToggle = await contract.isMintEnabled();

        // Tx Check
        expect(statusToggle).to.be.a('object');

        // Event Check
        mintEnabledLog = await contract.queryFilter("MintEnabledLog");
        statusToggleLog = await mintEnabledLog[0].args[mintEnabledLog[0].args.length -1];

        expect(statusToggleLog).to.be.a('boolean');
        expect(statusToggleLog).to.equal(true);
        expect(statusToggle).to.emit(contract, "MintEnabledLog").withArgs(wallet.address, true);

    });

    // /*      Mints NFT       */
    // it('Mints an NFT', async () => {

    // })

    it('Tx matches the mint price', async () => {
        // Enable minting
        statusToggle = await contract.isMintEnabled();
        
        const mintItemTxn = expect(await contract.mint({ value: ethers.utils.parseEther("0.01") }));
        // console.log(mintItemTxn)
        
        // mintItemTxn = expect(await deployedNFTContract.mint({ value: ethers.utils.parseEther("0.001") })).to.be.reverted;
    })

    it('Tx is greater than mint price and reverts', async () => {
        // Enable minting
        statusToggle = await contract.isMintEnabled();

        // console.log(deployedNFTContract);

        const estimation = await deployedNFTContract.estimateGas.mint({ value: ethers.utils.parseEther("0.01") });
        console.log("Gas Estimate: ", ethers.utils.formatUnits(estimation, "ether"));
        
        const mintItemTxn = expect(await deployedNFTContract.mint({ value: ethers.utils.parseEther("0.1") })).to.be.reverted;
        // console.log(mintItemTxn)
        
        // mintItemTxn = expect(await deployedNFTContract.mint({ value: ethers.utils.parseEther("0.001") })).to.be.reverted;
    })

})