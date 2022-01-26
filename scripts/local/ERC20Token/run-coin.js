const coin = async () => {
    const coinContractFactory = await hre.ethers.getContractFactory('Coin');
    const coinContract = await coinContractFactory.deploy()
    await coinContract.deployed();
    console.log('Contract address:', coinContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(coinContract.address);

    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));
};

const runCoin = async () => {
    try {
        await coin();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runCoin();