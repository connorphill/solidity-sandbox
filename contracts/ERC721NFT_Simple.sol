// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//A standard interface for non-fungible tokens, also known as deeds.
contract ERC721NFT_Simple is ERC721, Ownable {
    
    // This is the mechanism used to keep store and increment tokenIds
    using Counters for Counters.Counter;

    // Private becasue of getter function
    Counters.Counter private supply;
    
    // NFT Economics
    uint256 public tokenId;
    uint256 public mintPrice = 0.01 ether; // Minimum minting cost
    uint256 public maxSupply = 10000; // Max NFT token Supply
    uint256 public maxMintAmountPerTxn = 5; // Max mint about per transaction
    mapping(address => uint256) public mintedWallets;

    // Visibility
    bool public mintEnabled = false;

    // Pass the name and symbol of the NFT. Example is "NFTWorld, "NFTWD"
    constructor (string memory name, string memory symbol) ERC721 (name, symbol) {
    }

    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

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

        // Used to save on gas
        tokenId = supply.current(); 

        // Safely run mint transaction
        _safeMint(msg.sender, tokenId);
    }


}