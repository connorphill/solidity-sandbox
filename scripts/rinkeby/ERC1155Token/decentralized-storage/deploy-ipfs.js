// hh run --network rinkeby <script>.js
const erc1155 = async () => {
    const accounts = await hre.ethers.getSigners();

    const tokenContractFactory = await hre.ethers.getContractFactory('ERC1155_IPFS_Token');
    const tokenContract = await tokenContractFactory.deploy();
    await tokenContract.deployed();
    
    console.log("=======        Deployment Meta         =======");
    console.log('Contract deployed to address:', tokenContract.address);
    console.log('Contract signer:', tokenContract.signer.address);

    let contractAdd = tokenContract.address;
    let signerAdd = tokenContract.signer.address;

    // Check contract ETH balance
    let contractBalance = await hre.ethers.provider.getBalance(contractAdd);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    // Check total ERC1155 supply
    console.log(
        "Initial - Contract Token Supply: \n ID 0: %d \n ID 1: %d \n ID 2: %d \n ID 3: %d",
        await tokenContract.balanceOf(signerAdd, 0),
        await tokenContract.balanceOf(signerAdd, 1),
        await tokenContract.balanceOf(signerAdd, 2),
        await tokenContract.balanceOf(signerAdd, 3),
        "\n"
    );


};

const runCoin = async () => {
    try {
        await erc1155();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runCoin();