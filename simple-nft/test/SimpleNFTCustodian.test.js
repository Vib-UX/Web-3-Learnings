const SimpleNFT = artifacts.require('./SimpleNFT.sol');
const SimpleNFTCustodian = artifacts.require('./SimpleNFTCustodian.sol');

contract('SimpleNFTCustodian', (accounts) => {
  const ORIGINAL_NFT_OWNER = accounts[1];
  const NEW_NFT_OWNER = accounts[2];

  let simpleNftCustodian;
  let simpleNft;

  before(async () => {
    simpleNftCustodian = await SimpleNFTCustodian.deployed();
    simpleNft = await SimpleNFT.deployed();

    await simpleNftCustodian.setSimpleNftAddress(simpleNft.address);
    
    await simpleNft.mintNft("mock-uri", 100, simpleNftCustodian.address, { from: ORIGINAL_NFT_OWNER });
  });

  describe('buyNft', () => {
    it('should not allow sale if price is not met', async () => {
      try {
        await simpleNftCustodian.buyNft(0, { from: NEW_NFT_OWNER, value: 50 });
        assert.notOk(false);
      } catch (error) {
        assert.ok(error);
      }
    });

    it('should transfer money to artist', async () => {
      const originalOwnerBalanceBefore = await web3.eth.getBalance(ORIGINAL_NFT_OWNER);
      await simpleNftCustodian.buyNft(0, { from: NEW_NFT_OWNER, value: 150 });
      const originalOwnerBalanceAfter = parseInt(originalOwnerBalanceBefore) + 150;
      assert.equal(parseInt(await web3.eth.getBalance(ORIGINAL_NFT_OWNER)), originalOwnerBalanceAfter);
    });
    
    it('should transfer nft to user', async () => {
      const newOwner = await simpleNft.ownerOf(0);
      assert.equal(newOwner, NEW_NFT_OWNER);
    });
    
    it('should mark item as sold', async () => {
      const nftSale = await simpleNft._listed(0);
      assert.equal(nftSale.isForSale, false);
    });    
  });
});