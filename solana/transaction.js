const web3 = require('@solana/web3.js');
const nacl = require('tweetnacl');
var bs58 = require('bs58')

// Airdrop SOL for paying transactions
const rpc_test = "https://api.testnet.solana.com"
const rpc_main = "https://api.mainnet-beta.solana.com";
const decimals = 10 **10;

(async () => {

    // J29963ZFJrsmtqNYc9gpEjCaPrrjR6p64iuB9tCJEvSm
    const seed = Buffer.from('721a9ddfe117e27196ca4bfce2b0d725f3bf75233e895050508c940f4c63e6ed', 'hex')
    const payer = web3.Keypair.fromSeed(seed)
    console.log(`from: ${payer.publicKey.toString()}`)

    // 6L8AbAfpyNAHpkVuKQDXhKyCP3KJUSQox8sLb8Lxpxvn
    let toAccount = web3.Keypair.fromSeed(Buffer.from("a0a0683636530d2757d517e12ac81347e4c4b2780ed2f522bea61c248e630062", 'hex'));
    console.log("toaccount: ", toAccount.publicKey.toString());

    let connection = new web3.Connection(rpc_test, 'confirmed');

    // Alternatively, manually construct the transaction
    let recentBlockhash = await connection.getRecentBlockhash();

    let manualTransaction = new web3.Transaction({
        recentBlockhash: recentBlockhash.blockhash,
        feePayer: payer.publicKey,
    });

    console.log(`111munalTransaction: ${JSON.stringify(manualTransaction)}\n`);

    manualTransaction.add(web3.SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: toAccount.publicKey,
        lamports: Number("12345678912345"),
    }));

    // manualTransaction.add(web3.SystemProgram.transfer({
    //     fromPubkey: toAccount.publicKey,
    //     toPubkey: "CRGaYDSN96upEmC216ApZDx1EEGPM7oMerY5Yni2vB7v",
    //     lamports: Number("123456"),
    // }));

    console.log(`222munalTransaction: ${JSON.stringify(manualTransaction)}\n`)

    // unsigned transaction 
    let transactionBuffer = manualTransaction.serializeMessage();
    console.log(`unsigned tx: ${transactionBuffer.toString('hex')}\n`)

    // sign transaction
    let signature = nacl.sign.detached(transactionBuffer, payer.secretKey);
    const txhash = bs58.encode(signature)
    console.log('txhash: ', txhash, '\n')
    // console.log(`signature: ${Buffer.from(signature).toString('hex')}\n`)

    // add signature
    manualTransaction.addSignature(payer.publicKey, signature);

    // sencond sign
    // let signature2 = nacl.sign.detached(transactionBuffer, toAccount.secretKey);
    // manualTransaction.addSignature(toAccount.publicKey, signature2);

    console.log(`333munalTransaction: ${JSON.stringify(manualTransaction)}\n`)

    let isVerifiedSignature = manualTransaction.verifySignatures();
    console.log(`The signatures were verifed: ${isVerifiedSignature}\n`)

    // The signatures were verified: true

    let rawTransaction = manualTransaction.serialize();

    console.log(`rawTransaction: ${rawTransaction.toString('hex')}`)

    const base58Tx = bs58.encode(rawTransaction)
    console.log(`base58 tx: ${base58Tx}`)

    // const sendRaw = await web3.sendAndConfirmRawTransaction(connection, rawTransaction);
    // console.log(`send raw: ${sendRaw}`)
})()

/**
 * insufficient lamports
 * {
    "jsonrpc": "2.0",
    "error": {
        "code": -32002,
        "message": "Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1",
        "data": {
            "accounts": null,
            "err": {
                "InstructionError": [
                    0,
                    {
                        "Custom": 1
                    }
                ]
            },
            "logs": [
                "Program 11111111111111111111111111111111 invoke [1]",
                "Transfer: insufficient lamports 2973123066, need 12345678912345",
                "Program 11111111111111111111111111111111 failed: custom program error: 0x1"
            ]
        }
    },
    "id": 1
}

blockhash not found 
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32002,
        "message": "Transaction simulation failed: Blockhash not found",
        "data": {
            "accounts": null,
            "err": "BlockhashNotFound",
            "logs": []
        }
    },
    "id": 1
}
 */