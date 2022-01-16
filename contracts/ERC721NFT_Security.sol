// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ERC721NFT_Security {
    function mintCheck (
        uint256 _tokenIds,
        uint256 _maxSupply,
        bool _mintEnabled, 
        uint256 _walletNFTs, 
        uint256 _mintPrice, 
        uint256 _txnValue
    )  public view {
        // Revert if mintEnabled is "false"
        require(_mintEnabled, "Minting not enabled");
        // Revert if the wallet minting the NFT has more than one token associated to the wallet
        console.log("NFTs present in wallet: %s", _walletNFTs);
        require(_walletNFTs < 1, "Exceeds max per wallet");
        // Revert if users transaction value is not equal to the mintPrice 
        console.log("msg.value = %s vs mintPrice = %s", _txnValue, _mintPrice);
        require(_txnValue == _mintPrice, "Wrong value");
        // Revert if maximum NFT tokenIds is met
        console.log("Current NFT Supply = %s vs Max NFT Supply = %s", _tokenIds, _maxSupply);
        require(_tokenIds < _maxSupply, "Sold Out");
    }
}