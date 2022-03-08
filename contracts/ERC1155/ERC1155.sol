pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155Token is ERC1155, Ownable {
    uint256 tokenSupply = 0;
    uint256 constant tokenId = 0;
    
    // @param is the hosted JSON file with the associated token information
    constructor() ERC1155("") {
        _mint(msg.sender, tokenId, 1, "");
    }

    // Mint
    function mint(uint256 amount) public onlyOwner {
        for(uint256 i = 0; i < amount; i++){
            _mint(msg.sender, tokenId, amount, "");
            tokenSupply++;
        }
    }
}