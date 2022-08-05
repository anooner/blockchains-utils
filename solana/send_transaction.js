const web3 = require('@solana/web3.js');
const nacl = require('tweetnacl');
var bs58 = require('bs58');

// Airdrop SOL for paying transactions
const rpc_test = "https://api.testnet.solana.com"
const rpc_main = "https://api.mainnet-beta.solana.com";
const decimals = 10 **10;

(async () => {

    const signedTx = "01974bb13e13979c8599de32820d30919de5aa4038af6f0aa032705c0d4ad5d7ad33262dca8df50b7bd4569d846eaf7883b4e763fa3f58726ebfcb2460a519d70901000103fce1763b2c9c02bb56481d49b752f2bb4c19abae31c1cc82ccb06298e44fef024f309265e89f906e56ff9254c2029d2143a98b050a164bf841d8baa81ce28153000000000000000000000000000000000000000000000000000000000000000046231891811bbdf14ed2d3e4048df2584179aa675011083aa4abb9bc3725d9d501020200010c020000003930000000000000";
    const base58Tx = bs58.encode(Buffer.from(signedTx, 'hex'))
    console.log(`base58 tx: ${base58Tx}`)
    
    let connection = new web3.Connection(rpc_test, 'confirmed');
    const sendRaw = await web3.sendAndConfirmRawTransaction(connection, Buffer.from(signedTx, 'hex'))
    .catch(err => {
        console.log(err.toString())
    });
    console.log(`send raw: ${sendRaw}`)
})()