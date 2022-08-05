const web3 = require('@solana/web3.js');
const nacl = require('tweetnacl');
var bs58 = require('bs58');

// Airdrop SOL for paying transactions
const rpc_test = "https://api.testnet.solana.com"
const rpc_main = "https://api.mainnet-beta.solana.com";
const decimals = 10 **10;

(async () => {
    // const fromPubkey = web3.Keypair.generate().publicKey;
    // const params = {
    //   fromPubkey,
    //   noncePubkey: web3.Keypair.generate().publicKey,
    //   authorizedPubkey: fromPubkey,
    //   lamports: 123,
    // };

    // const manualTransaction = new web3.Transaction().add(
    //     web3.SystemProgram.createNonceAccount(params),
    // );
    
    // J29963ZFJrsmtqNYc9gpEjCaPrrjR6p64iuB9tCJEvSm
    const seed = Buffer.from('721a9ddfe117e27196ca4bfce2b0d725f3bf75233e895050508c940f4c63e6ed', 'hex')
    const payer = web3.Keypair.fromSeed(seed)
    console.log(`from: ${payer.publicKey.toString()}`)

    // 6L8AbAfpyNAHpkVuKQDXhKyCP3KJUSQox8sLb8Lxpxvn
    let nonceAccount = web3.Keypair.generate()
    console.log("toaccount: ", nonceAccount.publicKey.toString());

    let connection = new web3.Connection(rpc_test, 'confirmed');

    // Alternatively, manually construct the transaction
    let recentBlockhash = await connection.getRecentBlockhash();

    let manualTransaction = new web3.Transaction({
        recentBlockhash: recentBlockhash.blockhash,
        feePayer: payer.publicKey,
    });

    console.log(`111munalTransaction: ${JSON.stringify(manualTransaction)}\n`);

    manualTransaction.add(web3.SystemProgram.createNonceAccount({
        fromPubkey: payer.publicKey,
        noncePubkey: nonceAccount.publicKey,
        lamports: Number("14476800"),
        authorizedPubkey: payer.publicKey
    }));

    const sig = await web3.sendAndConfirmTransaction(
        connection,
        manualTransaction,
        [payer, nonceAccount],
        {preflightCommitment: 'confirmed'},
    );
    console.log(`sig: ${sig}`)

    const nonceBalance = await connection.getBalance(nonceAccount.publicKey);
    console.log(`nonce balance: ${nonceBalance}`)

    const nonceA = await connection.getNonce(nonceAccount.publicKey);
    console.log(`nonce balance: ${nonceA}`)

    // console.log(`222munalTransaction: ${JSON.stringify(manualTransaction)}\n`)

    // // unsigned transaction 
    // let transactionBuffer = manualTransaction.serializeMessage();
    // console.log(`unsigned tx: ${transactionBuffer.toString('hex')}\n`)

    // // sign transaction
    // let signature = nacl.sign.detached(transactionBuffer, payer.secretKey);
    // const txhash = bs58.encode(signature)
    // console.log('txhash: ', txhash, '\n')

    // // add signature
    // manualTransaction.addSignature(payer.publicKey, signature);

    // console.log(`333munalTransaction: ${JSON.stringify(manualTransaction)}\n`)

    // let isVerifiedSignature = manualTransaction.verifySignatures();
    // console.log(`The signatures were verifed: ${isVerifiedSignature}\n`)

    // // The signatures were verified: true

    // let rawTransaction = manualTransaction.serialize();

    // console.log(`rawTransaction: ${rawTransaction.toString('hex')}`)
    // const sendRaw = await web3.sendAndConfirmRawTransaction(connection, rawTransaction);
    // console.log(`send raw: ${sendRaw}`)
    
})()