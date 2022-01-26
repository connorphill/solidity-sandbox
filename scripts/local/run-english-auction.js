const contractDeploy = async () => {
    const accounts = await hre.ethers.getSigners();

    const ERC721NFT = await hre.ethers.getContractAt("ERC721NFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const englishAuctionContractFactory = await hre.ethers.getContractFactory('EnglishAuction', accounts[1]); // ('contract-name', signer Obj)

    const englishAuctionContract = await englishAuctionContractFactory.deploy(
        // accounts[1].address,
        ERC721NFT.address,
        1,
        5
    )
    
    await englishAuctionContract.deployed();

    console.log(englishAuctionContract)
    
    console.log('Contract address:', englishAuctionContract.address);
    console.log('Contract Signer address:', englishAuctionContract.signer.address);

    // English Auction - Transaction
    const setValueTxn = await englishAuctionContract.setValue('Hello New Test');
    await setValueTxn.wait();
    console.log(setValueTxn);

    const getTxn = await englishAuctionContract.getValue();
    // await getTxn.wait();
    console.log(getTxn);

    const startTxn = await englishAuctionContract.start();
    await startTxn.wait();
    console.log(startTxn);

    // startTxn.then(function(result){
    //     console.log(result);
    // })

    // let contractBalance = await hre.ethers.provider.getBalance(englishAuctionContract.address);

    // console.log('Contract balance:', hre.ethers.utils.formatEther(englishAuctionContract));
};

const runContractDeploy = async () => {
    try {
        await contractDeploy();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runContractDeploy();