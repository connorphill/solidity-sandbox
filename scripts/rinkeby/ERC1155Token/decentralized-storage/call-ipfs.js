// hh run --network rinkeby <script>.js
const erc1155Calls = async () => {
    const accounts = await hre.ethers.getSigners();
    const contractAddress = process.env.ERC1155_IPFS_RINKEBY_ADDRESS;

    console.log("=======        ERC1155 Calls         =======");
    // Get the deployed NFT contract and set signer to be address present in loop
    const deployedContract = await hre.ethers.getContractAt("ERC1155_IPFS_Token", contractAddress, accounts[0]);
    console.log("Contract Address: %s", deployedContract.address);

    // Call .getTotalSupply() and .getAllTokens()
    console.log("Token URI #0: %s", await deployedContract.uri(0));
    console.log("Token URI #1: %s", await deployedContract.uri(1));
    console.log("Token URI #2: %s", await deployedContract.uri(2));
    console.log("Token URI #3: %s", await deployedContract.uri(3));
    // console.log("NFT Tokens Minted: %i", await deployedContract.getTotalSupply());
    // console.log("Signer Wallet NFT Tokens: %i", await deployedContract.getAllTokens());
    

};

const getERC1155Calls = async () => {
    try {
        await erc1155Calls();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

getERC1155Calls();