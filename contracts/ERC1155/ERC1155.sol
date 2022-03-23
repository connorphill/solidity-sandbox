pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC1155Token is ERC1155, Ownable {

    // Easier to convert data types
    // using Strings for uint256;
    // Will be using this contract
    using Counters for Counters.Counter;

    // Private because of getter function
    Counters.Counter private tokenSupply;

    // Real estate resource attributes
    uint256 public constant BARTERCOIN = 0;
    uint256 public constant LOTS = 1;
    uint256 public constant BUILDINGS = 2;
    uint256 public constant VENUES = 3;
    
    // @param is the hosted JSON file with the associated token information
    constructor() ERC1155("") {
        // _mint(msg.sender, tokenId, 1, "");
        _mint(msg.sender, BARTERCOIN, 10**18, "");
        _mint(msg.sender, LOTS, 500, "");
        _mint(msg.sender, BUILDINGS, 100, "");
        _mint(msg.sender, VENUES, 5, "");
    }

    // Mint additional tokens
    function mint(uint256 tokenId, uint256 amount) public onlyOwner {
        _mint(msg.sender, tokenId, amount, "");
    }
    
    
}