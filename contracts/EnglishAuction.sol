pragma solidity ^0.8.10;

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint tokenId
    ) external;

    function transferFrom(
        address,
        address,
        uint
    ) external;

}

contract EnglishAuction {
    IERC721 public nft;
    uint public nftId;

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

    
    function start() external {
        require(!started, "auction started");
        require(msg.sender == seller, "not seller");

        nft.transferFrom(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + 7 days;

        emit Start();
    }

}
