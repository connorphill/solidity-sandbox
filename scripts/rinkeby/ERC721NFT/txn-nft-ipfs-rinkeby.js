const nft = async () => {
    const accounts = await hre.ethers.getSigners();
    const contractAddress = process.env.ERC721NFT_IPFS_RINKEBY_ADDRESS;

    // NFT meta-data (JSON file) CID
    const nftURI = "ipfs://Qmc6gahs1BdRbzmf9cSt4JdCT4vADU7VwUnaWyaQrH6r4y";

    console.log("=======        Transaction Tests         =======");
    // Loop through first three accounts (excluding 0 since it deployed the script)
    console.log("=======        Minting %s: %s         =======", nftURI, accounts[1].address);

    // Get the deployed NFT contract and set signer to be address present in loop
    const deployedNFTContract = await hre.ethers.getContractAt("ERC721NFT_IPFS", contractAddress, accounts[1]);
    console.log("Contract Address: %s", deployedNFTContract.address);
    console.log("Gas Estimate: %s", deployedNFTContract.address);

    // Mint an NFT
    // .mint() requirements: (tokenURI, fileName, { unsigned transaction attributes })
    const mintItemTxn = await deployedNFTContract.mint(nftURI,  { value: ethers.utils.parseEther("0.001") });
    await mintItemTxn.wait();
    console.log(mintItemTxn);
    console.log(mintItemTxn.address);
};

const txnNft = async () => {
    try {
        await nft();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

txnNft();