const nft = async () => {
    const accounts = await hre.ethers.getSigners();

    const abi = [
        "totalSupply() public view returns (uint256)",
        "mintItem(address minter, string memory tokenURI) public onlyOwner returns (uint256)"
    ];

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    const provider = await hre.ethers.provider;

    const nftContractFactory = await hre.ethers.getContractFactory('ERC721NFT');
    const nftContract = await nftContractFactory.deploy("Dogies", "DOG")
    await nftContract.deployed();
    console.log('Contract address:', nftContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(nftContract.address);

    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    const totalSupplyCall = await nftContract.totalSupply();
    console.log('Total NFT Supply: ' + totalSupplyCall);

    const toggleMintTxn = await nftContract.isMintEnabled();
    console.log(toggleMintTxn);


    // Loop through first three accounts (excluding 0 since it deployed the script)
    for(var i = 1; i < 4; i++){
        console.log("Loop starting for: %s", accounts[i].address);
    
        // Get the deployed NFT contract and set signer to be address present in loop
        const deployedNFTContract = await hre.ethers.getContractAt("ERC721NFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3", accounts[i]);

        // Get the total NFT supply
        const totalSupplyCall = await nftContract.totalSupply();
        console.log("Total Supply: " + totalSupplyCall);

        // Mint an NFT
        const mintItemTxn = await deployedNFTContract.mint({ value: ethers.utils.parseEther("0.01") });
        await mintItemTxn.wait();
        console.log(mintItemTxn);
        console.log(mintItemTxn.value);
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