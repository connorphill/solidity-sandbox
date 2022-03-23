pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//A standard interface for non-fungible tokens, also known as deeds.
contract ERC721NFT is ERC721, Ownable {
    
    // Easier to convert data types
    // using Strings for uint256;
    // Will be using this contract
    using Counters for Counters.Counter;

    // Private becasue of getter function
    Counters.Counter private supply;
    
    // URI Meta
    // string public uriPrefix = ""; // User submitted URI to NFT files
    // string public uriSuffix = ".json"; // Ensures that the JSON format of the URI is always used
    // string public hiddenMetadataUri; // NFT Metadata

    // NFT Economics
    uint256 public tokenId;
    uint256 public mintPrice = 0.01 ether; // Minimum minting cost
    uint256 public maxSupply = 10000; // Max NFT token Supply
    uint256 public maxMintAmountPerTxn = 5; // Max mint about per transaction
    mapping(address => uint256) public mintedWallets;

    // Visibility
    bool public mintEnabled = false;
    // bool public revealed = false;

    // Mint Compliance - Make sure mint cost is greater than minimum and amount of mints is less than the transaction limit
    // modifier mintCompliance(uint _mintAmount) {
    //     require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTxn, "Invalid min amount.");
    //     require(supply.current() + _mintAmount <= maxSupply, "Max supply exceeded.");
    //     _;
    // }


    
    // // Optional mapping for token URIs
    // mapping (uint256 => string) private _tokenURIs;

    // // Base URI
    // string private _baseURIextended;

    // "NFTWorld, "NFTWD"
    constructor (string memory name, string memory symbol) ERC721 (name, symbol) {
    }

    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

    // function contractURI() public pure returns (string memory) {
    //     return "JSON link to contract";
    // }

    function isMintEnabled() external onlyOwner {
        mintEnabled = !mintEnabled;
    }

    function mint() external payable {

        // Revert if mintEnabled is "false"
        require(mintEnabled, "Minting not enabled");

        // Revert if the wallet minting the NFT has more than one token associated to the wallet
        console.log("NFTs present in wallet: %s", mintedWallets[msg.sender]);
        require(mintedWallets[msg.sender] < 1, "Exceeds max per wallet");
        
        // Revert if users transaction value is not equal to the mintPrice 
        console.log("msg.value = %s vs mintPrice = %s", msg.value, mintPrice);
        require(msg.value == mintPrice, "Wrong value");

        // Revert if maximum NFT supply is met
        console.log("Current NFT Supply = %s vs Max NFT Supply = %s", supply.current(), maxSupply);
        require(supply.current() < maxSupply, "Sold Out");
        
        // Increment wallet NFT ID and increment the current NFT supply
        mintedWallets[msg.sender]++;
        supply.increment();

        tokenId = supply.current(); // Used to save on gas

        // Safely run mint transaction
        _safeMint(msg.sender, tokenId);
    }


}

// Moving comments

    // function mintItem(address minter, string memory tokenURI) public onlyOwner returns (uint256) {
    //     supply.increment();
    //     uint256 newItemId = supply.current();
    //     _mint(minter, newItemId);
    //     _setTokenURI(newItemId, tokenURI);
    //     return newItemId;
    // }

    // function setBaseURI(string memory baseURI_) external onlyOwner() {
    //     _baseURIextended = baseURI_;
    // }
    
    // function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
    //     require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
    //     _tokenURIs[tokenId] = _tokenURI;
    // }
