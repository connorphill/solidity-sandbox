const erc1155 = async () => {
    const accounts = await hre.ethers.getSigners();

    const erc1155ContractFactory = await hre.ethers.getContractFactory('ERC1155Token');
    const erc1155Contract = await erc1155ContractFactory.deploy();
    await erc1155Contract.deployed();
    console.log('Contract deployed to address:', erc1155Contract.address);

    let contractBalance = await hre.ethers.provider.getBalance(erc1155Contract.address);

    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    // Loop through first three accounts (excluding 0 since it deployed the script)
    for(var i = 1; i < 4; i++){
        console.log("Loop starting for: %s", accounts[i].address);
    
        // Get the deployed NFT contract and set signer to be address present in loop
        const deployedErc1155Contract = await hre.ethers.getContractAt("ERC1155Token", erc1155Contract.address, accounts[i]);

        // Mint an NFT
        const mintItemTxn = await deployedErc1155Contract.mint(1);
        await mintItemTxn.wait();
        console.log(mintItemTxn);
        console.log("mintItemTxn.value: ", mintItemTxn.value);
    }

};

const runContract = async () => {
    try {
        await erc1155();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runContract();