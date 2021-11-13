const SimpleNFT = artifacts.require('./SimpleNFT.sol');
const truffleAssert = require('truffle-assert');

contract('SimpleNFT', (accounts) => {
  const MOCK_CUSTODIAN = accounts[1];

  let simpleNft;

  before(async () => {
    simpleNft = await SimpleNFT.deployed();
  });

  describe('mintNft', () => {
    it('should successfully mint nft', async () => {
      const mintedNftId = await simpleNft.mintNft("mock-uri", 100, MOCK_CUSTODIAN);
      truffleAssert.eventEmitted(mintedNftId, "Transfer", event => {
        const { tokenId } = event;
        return (
          parseInt(tokenId.toString()) === 0
        );
      });
    });

    it('should approve custodian after minting nft', async () => {
      const mintedNftId = await simpleNft.mintNft("mock-uri-2", 100, MOCK_CUSTODIAN);
      truffleAssert.eventEmitted(mintedNftId, "Approval", event => {
        const { approved } = event;
        return (
          approved === MOCK_CUSTODIAN
        );
      });
    });
    
    it('should list NFT for sale', async () => {
      const nftSaleData = await simpleNft._listed(1);
      assert.equal(parseInt(nftSaleData.price.toString()), 100);
      assert.equal(parseInt(nftSaleData.id.toString()), 1);
      assert.equal(nftSaleData.isForSale, true);
    });
  });
  
  describe('markAsSold', () => {
    it('should mark NFT as sold', async () => {
      // use from previous tests
      await simpleNft.markAsSold(1);
      const nftSaleData = await simpleNft._listed(1);
      assert.equal(nftSaleData.isForSale, false);
    });
  });
});