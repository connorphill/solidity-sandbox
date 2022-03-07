pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155Token is ERC1155, Ownable {
    uint256 constant tokenId = 0;
    
    constructor() ERC1155("") {
        _mint(msg.sender, tokenId, 1, "");
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, tokenId, amount, "");
    }
}