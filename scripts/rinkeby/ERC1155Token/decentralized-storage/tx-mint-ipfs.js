const nft = async () => {
    const accounts = await hre.ethers.getSigners();
    const contractAddress = process.env.ERC1155_IPFS_RINKEBY_ADDRESS;

    // NFT meta-data (JSON file) CID
    const metaURI = "ipfs://QmdacJ2nNJFJMWZ1KzVb1wu49WebxiSmafS45jfNGW9TXL/";

    console.log("=======        Transaction Tests         =======");

    let BARTERCOIN = 0;
    let LOTS = 1;
    let BUILDINGS = 2;
    let VENUES = 3;

    console.log("=======        Minting %s: %s         =======", metaURI, accounts[0].address);

    // Get the deployed NFT contract and set signer to be address present in loop
    const erc1155Contract = await hre.ethers.getContractAt("ERC1155_IPFS_Token", contractAddress, accounts[0]);
    console.log("Contract Address: %s", erc1155Contract.address);

    // Mint an NFT
    // .mint() requirements: (tokenURI, fileName, { unsigned transaction attributes })
    const barterMintTx = await erc1155Contract.mint(BARTERCOIN, 1e18.toString(), metaURI + BARTERCOIN + ".json");
    // .wait() always needs to be called after a tx method so the transaction will wait until it is mined and then the next one will be executed
    await barterMintTx.wait();
    const lotsMintTx = await erc1155Contract.mint(LOTS, 500, metaURI + LOTS + ".json");
    await lotsMintTx.wait();
    const buildingsMintTx = await erc1155Contract.mint(BUILDINGS, 100, metaURI + BUILDINGS + ".json");
    await buildingsMintTx.wait();
    const venuesMintTx = await erc1155Contract.mint(VENUES, 5, metaURI + VENUES + ".json");
    await venuesMintTx.wait();

    console.log(`Barter Token Address: ${barterMintTx.address} \n`);
    console.log(barterMintTx);
    console.log(`Lots Token Address: ${lotsMintTx.address} \n`);
    console.log(lotsMintTx);
    console.log(`Buildings Token Address: ${buildingsMintTx.address} \n`);
    console.log(buildingsMintTx);
    console.log(`Venues Token Address: ${venuesMintTx.address} \n`);
    console.log(venuesMintTx);

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