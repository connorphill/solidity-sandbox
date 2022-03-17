const erc1155 = async () => {
    const accounts = await hre.ethers.getSigners();

    const erc1155ContractFactory = await hre.ethers.getContractFactory('ERC1155Token');
    const erc1155Contract = await erc1155ContractFactory.deploy();
    await erc1155Contract.deployed();
    console.log('Contract deployed to address:', erc1155Contract.address, '\n');
    // console.log(await erc1155Contract.balance)

    // Mint an NFT
    // const mintItemTxn = await erc1155Contract.mint(hre.ethers.utils.parseEther("0.01"));
    // await mintItemTxn.wait();
    // console.log(mintItemTxn);
    // console.log("mintItemTxn.value: ", mintItemTxn.value);

    let contractAdd = erc1155Contract.address;
    let ownerAdd = accounts[0].address;
    let receiverAdd = accounts[1].address;
    let receiverAddTwo = accounts[2].address;

    let contractBalance = await hre.ethers.provider.getBalance(contractAdd);
    let ownerBalance = await hre.ethers.provider.getBalance(ownerAdd);
    let receiverBalance = await hre.ethers.provider.getBalance(receiverAdd);
    let receiverBalanceTwo = await hre.ethers.provider.getBalance(receiverAddTwo);

    console.log('Contract Address:', contractAdd);
    console.log('Post-deploy - ETH Balance:', hre.ethers.utils.formatEther(contractBalance), '\n');
    console.log('Owners Address:', ownerAdd);
    console.log('Post-deploy - ETH Balance:', hre.ethers.utils.formatEther(ownerBalance), '\n');
    console.log('Contract Address:', receiverAdd);
    console.log('Post-deploy - ETH Balance:', hre.ethers.utils.formatEther(receiverBalance), '\n');
    
    console.log(
        "Initial - Contract Token Supply: \n ID 0: %d \n ID 1: %d \n ID 2: %d \n ID 3: %d",
        await erc1155Contract.balanceOf(accounts[0].address, 0),
        await erc1155Contract.balanceOf(accounts[0].address, 1),
        await erc1155Contract.balanceOf(accounts[0].address, 2),
        await erc1155Contract.balanceOf(accounts[0].address, 3),
        "\n"
    );
    
    console.log("=====      Tx #1 - Transaction - Transfer tokens to receiverAdd     ===== \n");
    
    // Use "0x00" if no data to be sent
    const sendTokens = await erc1155Contract.safeTransferFrom(ownerAdd, receiverAdd, 1, 10, "0x00");

    console.log(
        "Post-Transfer - Contract Token Supply: \n ID 0: %d \n ID 1: %d \n ID 2: %d \n ID 3: %d",
        await erc1155Contract.balanceOf(accounts[0].address, 0),
        await erc1155Contract.balanceOf(accounts[0].address, 1),
        await erc1155Contract.balanceOf(accounts[0].address, 2),
        await erc1155Contract.balanceOf(accounts[0].address, 3),
        "\n"
    );

    console.log("==     Account Receiver One     ==\n")
    console.log("Token %d Balance: %d", 1, await erc1155Contract.balanceOf(receiverAdd, 1), "\n");
    
    console.log("=====      Tx #2 - Batch Transaction - Transfer tokens to receiverAddTwo     ===== \n");

    const batchSendTokens = await erc1155Contract.safeBatchTransferFrom(ownerAdd, receiverAddTwo, [0, 1], [100, 10], "0x00");

    console.log(
        "Post-Batch Transfer - Contract Token Supply: \n ID 0: %d \n ID 1: %d \n ID 2: %d \n ID 3: %d",
        await erc1155Contract.balanceOf(ownerAdd, 0),
        await erc1155Contract.balanceOf(ownerAdd, 1),
        await erc1155Contract.balanceOf(ownerAdd, 2),
        await erc1155Contract.balanceOf(ownerAdd, 3),
        "\n"
    );

    console.log("==     Account Receiver Two     ==\n")
    console.log("Token %d - Balance: %d", 0, await erc1155Contract.balanceOf(receiverAddTwo, 0));
    console.log("Token %d - Balance: %d", 1, await erc1155Contract.balanceOf(receiverAddTwo, 1), "\n");
    
    console.log("=====      Balance of Batch - Each token and address     ===== \n");

    console.log(await erc1155Contract.balanceOfBatch([receiverAdd, receiverAddTwo], [0,0]))
    const balanceTokenBatch = await erc1155Contract.balanceOfBatch([receiverAdd, receiverAddTwo], [0,0])
    
    function batchBalanceObjParse(arr){
        for(var i = 0; i < arr.length; i++){
            console.log(arr[i]);
        }
    }
    
    console.log(
        "Post-Tx #2 - Address Wallet Tokens Stored: \n",
        await erc1155Contract.balanceOfBatch(
            [
                receiverAdd, receiverAddTwo,
                receiverAdd, receiverAddTwo,
                receiverAdd, receiverAddTwo,
                receiverAdd, receiverAddTwo
            ], 
            [
                0,0,
                1,1,
                2,2,
                3,3
            ]
        )
    );
    
    console.log(typeof(await erc1155Contract.balanceOfBatch([receiverAdd, receiverAddTwo], [0,0])))


};

const runTxs = async () => {
    try {
        await erc1155();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runTxs();