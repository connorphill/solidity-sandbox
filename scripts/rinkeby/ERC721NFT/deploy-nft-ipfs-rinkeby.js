const nft = async () => {
    const accounts = await hre.ethers.getSigners();

    const nftContractFactory = await hre.ethers.getContractFactory('ERC721NFT_IPFS');
    const nftContract = await nftContractFactory.deploy("Hoot", "OWL");
    await nftContract.deployed();
    
    console.log("=======        Deployment Meta         =======");
    console.log('Contract deployed to address:', nftContract.address);
    console.log('Contract signer:', nftContract.signer.address);

    // Check contract ETH balance
    let contractBalance = await hre.ethers.provider.getBalance(nftContract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    // Check total NFT supply
    const totalSupplyCall = await nftContract.getTotalSupply();
    console.log('Total NFT Supply: ' + totalSupplyCall);

    // Enable minting
    const toggleMintTxn = await nftContract.isMintEnabled();
    console.log(toggleMintTxn);

};

const runCoin = async () => {
    try {
        await nft();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runCoin();