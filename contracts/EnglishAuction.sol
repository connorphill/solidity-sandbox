pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IERC721 {
    function safeTransferFrom(
        address from, // This is an NFT address from the ERC721 contract
        address to, // This is a wallet address
        uint tokenId
    ) external;

    function transferFrom(
        address, // This is an NFT address from the ERC721 contract
        address, // This is a wallet address
        uint
    ) external;

}

contract EnglishAuction {
    IERC721 public nft;
    uint public nftId;
    string public name;

    bool public started;
    bool public ended;
    uint public endAt;


    address payable public seller;
    
    uint public highestBid;


    event Start();
    event Bid(address indexed sender, uint amount);

    constructor(address _nft, uint _nftId, uint _startingBid) {
        nft = IERC721(_nft);
        nftId = _nftId;
        seller = payable(msg.sender);
        highestBid = _startingBid;
    }

    
    function setValue(string memory _name) public returns (string memory){
        name = _name;
        return name;
    }

    function getValue() public view returns (string memory) {
        return name;
    }

    
    function start() public {
        console.log(msg.sender);
        console.log(address(this));

        require(!started, "auction started");
        require(msg.sender == seller, "not seller");

        // msg.sender = The address making a call to the contract
        // address(this) = The contract address.
        // nftId = Id of the NFT

        nft.transferFrom(msg.sender, address(this), nftId); 
        // started = true;
        // endAt = block.timestamp + 7 days;

        emit Start();
    }

}
