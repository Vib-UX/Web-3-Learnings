var SimpleNFT = artifacts.require("./SimpleNFT.sol");
var SimpleNFTCustodian = artifacts.require("./SimpleNFTCustodian.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleNFT);
  deployer.deploy(SimpleNFTCustodian);
};
