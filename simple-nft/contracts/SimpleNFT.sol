// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
// We are using counters internally that way we generate new id's when mint NFTs

contract SimpleNFT is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    NFTSale[] public _listed;

    struct NFTSale{
        uint256 id;
        uint price;
        bool isForSale;
    }

    constructor() ERC721("SimpleNFT", "SNFT"){}

    function getSalePrice(uint256 nftId) external view returns (uint){
        return _listed[nftId].price;
    }

    function transferNft(address currentOwner, address newOwner, uint256 nftId) external{
        safeTransferFrom(currentOwner, newOwner, nftId);
    }

    function markAsSold(uint256 nftId) external{
        _listed[nftId].isForSale=false;
    }

    function mintNft(string memory tokenURI,uint price, address custodian) public{
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        approve(custodian, newItemId);

        NFTSale memory sale = NFTSale(newItemId,price,true);
        _listed.push(sale);
        _tokenIds.increment();
    }

}
