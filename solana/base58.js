const web3 = require('@solana/web3.js');
var bs58 = require('bs58');
(() => {
    const txhash = bs58.encode(Buffer.from("198bcf061ba23f4916e1f47e5574b06fb2e2231dfb3f0f9dfc216578578b97fdc11a935cc7202d8b9ddb18cad5190de02f80512df0021b869787b6318ff1c30b", 'hex'))
    console.log('txhash: ', txhash)

    
})()
