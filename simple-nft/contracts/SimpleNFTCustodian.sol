// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./SimpleNFT.sol";

contract SimpleNFTCustodian {
    SimpleNFT public simpleNFT;

    function setSimpleNftAddress(SimpleNFT instanceAddress) public {
        simpleNFT = instanceAddress;
    }

    function buyNft(uint256 nftId) public payable{
        uint salePrice = simpleNFT.getSalePrice(nftId);
        uint amountPaid = msg.value;

        require(amountPaid>=salePrice);
        
        address payable currentOwner = payable(simpleNFT.ownerOf(nftId));
        currentOwner.transfer(amountPaid);
        simpleNFT.transferNft(currentOwner, msg.sender, nftId);
        simpleNFT.markAsSold(nftId);

    }

}
