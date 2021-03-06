pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC1155_Token is ERC1155, Ownable {

    // Easier to convert data types
    // using Strings for uint256;
    // Will be using this contract
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Private because of getter function
    Counters.Counter private tokenSupply;

    mapping (uint256 => string) private _tokenURIs;


    // Token and Symbol
    string public name;
    string public symbol;

    // Real estate resource attributes
    uint256 public constant BARTERCOIN = 0;
    uint256 public constant LOTS = 1;
    uint256 public constant BUILDINGS = 2;
    uint256 public constant VENUES = 3;
    
    // @param is the hosted JSON file with the associated token information
    // _setUri needs to be overwritten to use ipfs. At the moment, _setURI does not work with decentralized content addressing
    // https://forum.openzeppelin.com/t/how-to-erc-1155-id-substitution-for-token-uri/3312/2
    // The URI is passed in the constructor when you create the NFT and remains unchangeable. Therefore, when you mint tokens for that NFT, the URI remains the same (which is different to ERC721, in which you pass the URI for every new NFT).
    constructor() ERC1155("ipfs://QmdacJ2nNJFJMWZ1KzVb1wu49WebxiSmafS45jfNGW9TXL/{id}.json") {
        // _mint(msg.sender, tokenId, 1, "");
        name = "New City";
        symbol = "NCITY";
        _mint(msg.sender, BARTERCOIN, 10**18, "");
        _mint(msg.sender, LOTS, 500, "");
        _mint(msg.sender, BUILDINGS, 100, "");
        _mint(msg.sender, VENUES, 5, "");
    }

    // Set URI
    function uri(uint256 tokenId) override public view returns (string memory) { 
        console.log(tokenId);
        console.log(_tokenURIs[tokenId]);
        return(_tokenURIs[tokenId]); 
    } 

    // Mint additional tokens
    function mint(uint256 tokenId, uint256 amount) public onlyOwner {
        _mint(msg.sender, tokenId, amount, "");
    }

}