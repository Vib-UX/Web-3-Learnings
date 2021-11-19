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

    const result = await contract.methods.getSalePrice(0).call();   // read from sc 
    /*
        Result will return a Unhandled promise due to getId web3 error
    */
    console.log(result);

    const addresses = await web3.eth.getAccounts();       // load accounts
    const receipt = await contract.methods.mintNft("sample_mint",10,'0x0000000').send({
        from: addresses[0],
        gas: 100,       // gas limit
        gasPrice: 100   // generally to tweak the parameter as per need
    })
    console.log(receipt);

    // Send ether to the smart contract 
    /*
        1. Execute a function
        2. Send ether directly (fallback function)
    */
        // 1. sending ether to a payable function 
        await contract.methods.sendEther().send({
            from: addresses[0],
            value: '100',     // the value here is in wei
        })


        // fallback 
        await web3.eth.sendTransaction({
            from: addresses[0],
            to: contract.option.address,
            value: '100000'
        });

    // Listen to event
    const receipt = await contract.method.emitEvent('hey').send(
        {
            from: addresses[0]
        }
    )

    console.log(receipt.events);

    // Listen to events using websockets
    contract.events.MyEvent({fromBlockNumber: 0})
        .on('data',event => console.log(event));
    

}

init();

// Ethereum API ---> call and send