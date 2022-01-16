// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./ERC721NFT_Security.sol";

//A standard interface for non-fungible tokens, also known as deeds.
contract ERC721NFT_IPFS is ERC721, Ownable {

    ERC721NFT_Security securityCheck = new ERC721NFT_Security();
    
    // This is the mechanism used to keep store and increment tokenIds
    using Counters for Counters.Counter;
    
    // This makes it easier to convert data types
    using Strings for uint256;

    // Counter to keep track of token IDs. Private becasue of using getter function
    Counters.Counter private tokenIds;
    
    // Token Metadata
    // Set token ID to string where file exists
    mapping(uint256 => string) private tokenURIs;

    // NFT metadata attributes in usable structure for getting all tokens
    struct TokenMeta {
        uint256 id;
        string uri;
    }
    

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


    // // Base URI
    // string private _baseURIextended;

    // "NFTWorld, "NFTWD"
    constructor (string memory name, string memory symbol) ERC721 (name, symbol) {}

    // Getter function for current tokenId index value in the NFT supply
    function getTotalSupply() public view returns (uint256) {
        return tokenIds.current();
    }

    function getAlltokens() public view returns (TokenMeta[] memory) {
        uint256 latestTokenId = tokenIds.current();
        uint256 counter = 0;
        TokenMeta[] memory results = new TokenMeta[](latestTokenId);

        for(uint256 i = 0; i < latestTokenId; i++){
            // If Token ID 0 exists, we want to add it to our results
            if (_exists(counter)) {
                string memory uri = tokenURI(counter);
                results[counter] = TokenMeta(counter, uri);
            }
            counter++;
        }
        return results;
    }

    // Switch to enable/disable minting on the blockchain
    function isMintEnabled() external onlyOwner {
        mintEnabled = !mintEnabled;
    }

    function _setTokenURI(uint256 _tokenIds, string memory _tokenURIs) internal {
        tokenURIs[_tokenIds] = _tokenURIs;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        require(_exists(_tokenId));
        string memory _tokenURI = tokenURIs[_tokenId];
        return _tokenURI;
    }

    function mint(string memory _tokenURI) external payable returns(uint256) {
        // Check to make sure conditions found in ERC721NFT_Security pass
        securityCheck.mintCheck(
            tokenIds.current(), 
            maxSupply, 
            mintEnabled, 
            mintedWallets[msg.sender], 
            mintPrice, 
            msg.value
        );
        
        // Increment wallet NFT ID and increment the current NFT tokenIds
        mintedWallets[msg.sender]++;
        tokenIds.increment();
        tokenId = tokenIds.current(); // Used to save on gas

        // Safely run mint transaction
        _safeMint(msg.sender, tokenId);
        // Set Token URI
        _setTokenURI(tokenId, _tokenURI);
        
        return tokenId;
    }


}

// Moving comments

    // function mintItem(address minter, string memory tokenURI) public onlyOwner returns (uint256) {
    //     tokenIds.increment();
    //     uint256 newItemId = tokenIds.current();
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


// Mint Compliance - Make sure mint cost is greater than minimum and amount of mints is less than the transaction limit
    // modifier mintCompliance(uint _mintAmount) {
    //     require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTxn, "Invalid min amount.");
    //     require(tokenIds.current() + _mintAmount <= maxSupply, "Max tokenIds exceeded.");
    //     _;
    // }

