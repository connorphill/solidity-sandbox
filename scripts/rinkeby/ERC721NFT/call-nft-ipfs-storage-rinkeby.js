const nftStorage = async () => {
    const accounts = await hre.ethers.getSigners();
    const contractAddress = process.env.ERC721NFT_IPFS_RINKEBY_ADDRESS;

    console.log("=======        Call NFT Storage         =======");
    // Get the deployed NFT contract and set signer to be address present in loop
    const deployedNFTContract = await hre.ethers.getContractAt("ERC721NFT_IPFS", contractAddress, accounts[0]);
    console.log("Contract Address: %s", deployedNFTContract.address);

    // Call .getTotalSupply() and .getAllTokens()
    console.log("NFT Tokens Supply: %i", await deployedNFTContract.maxSupply());
    console.log("NFT Tokens Minted: %i", await deployedNFTContract.getTotalSupply());
    console.log("Signer Wallet NFT Tokens: %i", await deployedNFTContract.getAllTokens());
    

};

const getNFTStorage = async () => {
    try {
        await nftStorage();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

getNFTStorage();