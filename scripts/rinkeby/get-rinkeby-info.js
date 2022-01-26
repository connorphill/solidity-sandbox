const rinkebyInfo = async () => {
    const network = "rinkeby"
    const provider = await hre.ethers.getDefaultProvider(network, {
        "alchemy": process.env.ALCHEMY_API
    });
    const gasPrice = hre.ethers.utils.formatUnits(await provider.getGasPrice(), "gwei");
    const feeData = await provider.getFeeData();

    const accounts = await hre.ethers.getSigners();

    console.log("====   Network ====");
    console.log("Network Name: %s", provider.network.name);
    console.log("Network Chain ID: %s", provider.network.chainId);
    
    console.log("\n");
    console.log("== Txn Recommendations ==");
    console.log("Gas Price (gwei): %d", gasPrice);
    console.log("Max Fee Per Gas (gwei): %d", hre.ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei"));
    console.log("Max Priority Fee Per Gas (gwei): %d", hre.ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei"));

    console.log("\n")
    console.log("====   Accounts ====")
    console.log("Accounts length: %i", accounts.length)
    for (var i = 0; i < accounts.length; i++){
        console.log("Wallet Address #%i: %s", i+1, accounts[i].address);
        console.log("Wallet Provider: %s", await accounts[i].provider.connection.url);
        console.log("Wallet balance (gwei): %i", hre.ethers.utils.formatUnits(await accounts[i].getBalance(), "gwei"));
        console.log("Wallet balance (Ether): %i", hre.ethers.utils.formatEther(await accounts[i].getBalance()));
    }
};

const getRinkebyInfo = async () => {
    try {
        await rinkebyInfo();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

getRinkebyInfo();