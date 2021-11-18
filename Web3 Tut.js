const Web3 = require('web3');

// Lets create a custom provider object 

const customProvider ={
    /*
        sendAsync method takes two args 
        1. Payload : Which identifies the ethereum Api that should be connected 
        2. Callback functions which will be used once we get the response from the ethereum blockchain
    */
    sendAsync: (payload,cb) =>{
        console.log('you called')
        console.log(payload);
        cb(undefined,100);
    }
    // The sendAsync method will be called by web3        
}

/* 
    Behind the scenes  

    const provider = new.Web3.providers.HttpProvider('http://localhost:8545');
    const web3 = new Web3(provider);

*/

// web3 with customProvider
const web3 = new Web3(customProvider);
web3.eth.getBlockNumber()
 .then(()=>console.log('done'));

const web3 = new Web3('http://localhost:8545');     // Provider object is created behind the scene using the attached url


// import contract 
const MyContract = require('./simple-nft/client/src/contracts/SimpleNFT.json')

const init = async() =>{
    const web3 = new Web3('http://localhost:9545');

    const id = await web3.eth.net.getId();
    console.log(id);
    const deployedNetwork = MyContract.networks[id];
    console.log(deployedNetwork);
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    )

    console.log(contract);

    const result = await contract.methods.getSalePrice(0).call();
    console.log(result);
}

init();