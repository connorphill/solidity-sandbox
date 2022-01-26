const nft = async () => {
    const accounts = await hre.ethers.getSigners();

    // NFT meta-data (JSON file) CID
    const nftURI = "ipfs://Qmc6gahs1BdRbzmf9cSt4JdCT4vADU7VwUnaWyaQrH6r4y";

    const nftContractFactory = await hre.ethers.getContractFactory('ERC721NFT_IPFS');
    const nftContract = await nftContractFactory.deploy("Dogies", "DOG")
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

    console.log("=======        Transaction Tests         =======");
    // Loop through first three accounts (excluding 0 since it deployed the script)
    for(var i = 1; i < 4; i++){
        console.log("=======        Loop #%i: %s         =======", i, accounts[i].address);
    
        // Get the deployed NFT contract and set signer to be address present in loop
        const deployedNFTContract = await hre.ethers.getContractAt("ERC721NFT_IPFS", nftContract.address, accounts[i]);
        console.log("Contract Address: %s", deployedNFTContract.address);

        // Get the total NFT supply
        const totalSupplyCall = await nftContract.getTotalSupply();
        console.log("Total Supply: " + totalSupplyCall);
        console.log(ethers.utils.parseEther("0.01"));

        // Mint an NFT
        // .mint() requirements: (tokenURI, { unsigned transaction attributes })
        const mintItemTxn = await deployedNFTContract.mint(nftURI, { value: ethers.utils.parseEther("0.01") });
        await mintItemTxn.wait();
    }

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