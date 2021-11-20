import React, { Component } from "react";
import SimpleNFT from "./contracts/SimpleNFT.json";
import SimpleNFTCustodian from "./contracts/SimpleNFTCustodian.json";


import getWeb3 from "./getWeb3";

import "./App.css";


class App extends Component {
  state = {loaded: false};
  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();
      
      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();
      // this.accounts = await this.web3.request({ method: 'eth_requestAccounts' });
    
      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      
      this.NFT = new this.web3.eth.Contract(
        SimpleNFT.abi,
        SimpleNFT.networks[this.networkId] && SimpleNFT.networks[this.networkId].address,
      );
      
      // we will deal with it later
      // this.tokenSaleInstance = new this.web3.eth.Contract(
      //   CDEXSale.abi,
      //   CDEXSale.networks[this.networkId] && CDEXSale.networks[this.networkId].address,
      // );
      

      // this.kycInstance = new this.web3.eth.Contract(
      //   KycContract.abi,
      //   KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.listenToTokenTransfer();
      this.setState({loaded: true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // updateUserTokens = async ()=>{
  //   let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
  //   this.setState({userTokens: userTokens});
  // }

  // listenToTokenTransfer = () =>{
  //   this.tokenInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
  // }

  handlemintNft = async() =>{
    await this.NFT.methods.mintNft("nft_supernova",100,this.accounts[0]).send({from: this.accounts[0], value: 0});
    // console.log(this.NFT.methods._listed(0).call())
  }

  handleInputChange = (event)=>{
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  // handleKycWhitelisting = async ()=>{
  //   await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
  //   alert("Kyc "+this.state.kycAddress+" is completed");
  // }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Welcome to NFT Mint</h1>
        <p>Get your NFT today!.</p>

        {/* <h2>Kyc Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.handleKycWhitelisting}>Add to Whitelist</button>
        <h2>Buy CDEX Tokens </h2>
        <p>If you want to buy tokens, send Wei to this address: {this.state.tokenSaleAddress}</p>
        <p>You curretly have: {this.state.userTokens} CDEX Tokens</p>
         */}
        <button type="button" onClick={this.handlemintNft}>Mint more NFT</button>
      </div>
    );
  }
}

export default App;
