const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const nacl = require('tweetnacl');
var bs58 = require('bs58');

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

(async () => {
  // Connect to cluster
  const connection = new web3.Connection(
    web3.clusterApiUrl('testnet'),
    'confirmed',
  );

  const tokenAddress = new web3.PublicKey("HFxYWRpLpDA16EyVyBKL8pABUMQySExacGYKNvAptRKd")
  const mint = new splToken.Token(connection, tokenAddress, splToken.TOKEN_PROGRAM_ID)

  // J29963ZFJrsmtqNYc9gpEjCaPrrjR6p64iuB9tCJEvSm  
  // N7LrgZ63KdWKzjJLp1nnpDsnKh3JauvTtEDNrjmTqtk
  const seed = Buffer.from('721a9ddfe117e27196ca4bfce2b0d725f3bf75233e895050508c940f4c63e6ed', 'hex')
  const fromWallet = web3.Keypair.fromSeed(seed)

  // 6L8AbAfpyNAHpkVuKQDXhKyCP3KJUSQox8sLb8Lxpxvn
  // DqcMdMbKu3EPWLtmUjZqPcxFgSArRgdy8mVowcYuQKhN
  let toWallet = web3.Keypair.fromSeed(Buffer.from("a0a0683636530d2757d517e12ac81347e4c4b2780ed2f522bea61c248e630062", 'hex'));

  const fromProgramAddress = await getProgramAddress(fromWallet, tokenAddress.toBuffer())
  const toProgramAddress = await getProgramAddress(toWallet, tokenAddress.toBuffer())
  console.log(`fromProgramAddress: ${fromProgramAddress}, toProgramAddress: ${toProgramAddress}`)

  /*
  // get account Info 
  const fromAccountInfo = await mint.getAccountInfo(new web3.PublicKey(fromProgramAddress)).catch(err => {
    console.log(`getAccountInfo error: ${err.toString()}`)
  })
  // console.log(`fromAccountInfo: ${fromAccountInfo.address} ${fromAccountInfo.amount}`)

  // Get the token account of the fromWallet Solana address, if it does not exist, create it
  const fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey,
  );
  console.log(`fromtokenaccount: ${fromTokenAccount.address} ${fromTokenAccount.amount}`)

  //get the token account of the toWallet Solana address, if it does not exist, create it
  // const toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
  //   toWallet.publicKey,
  // );
  // console.log(`to token account: ${toTokenAccount.address}`)
  */

  // Add token transfer instructions to transaction
  // const manualTransaction = new web3.Transaction()
  
  // let recentBlockhash = await connection.getRecentBlockhash();

  let manualTransaction = new web3.Transaction({
      // recentBlockhash: recentBlockhash.blockhash,
      recentBlockhash: "Dz8wj9t9wfMk63pArL19tYA3j1DDpo7ghVve4fbh5bUu",
      feePayer: fromWallet.publicKey,
  });

  manualTransaction.add(
    splToken.Token.createAssociatedTokenAccountInstruction(
    splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    splToken.TOKEN_PROGRAM_ID,
    tokenAddress,
    new web3.PublicKey(toProgramAddress),
    toWallet.publicKey,
    fromWallet.publicKey
  ))

  manualTransaction.add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,  // program id
      new web3.PublicKey(fromProgramAddress),   //  source 
      new web3.PublicKey(toProgramAddress),     // destination
      fromWallet.publicKey,       // owner
      [],
      10**9,
    ),
  );

  // // unsigned transaction 
  let transactionBuffer = manualTransaction.serializeMessage();
  console.log(`unsigned tx: ${transactionBuffer.toString('hex')}\n`)

  // // sign transaction
  let signature = nacl.sign.detached(transactionBuffer, fromWallet.secretKey);
  const txhash = bs58.encode(signature)
  console.log('txhash: ', txhash, '\n')
  console.log(`signature: ${Buffer.from(signature).toString('hex')}\n`)

  // // add signature
  manualTransaction.addSignature(fromWallet.publicKey, signature);

  console.log(`333munalTransaction: ${JSON.stringify(manualTransaction)}\n`)

  let isVerifiedSignature = manualTransaction.verifySignatures();
  console.log(`The signatures were verifed: ${isVerifiedSignature}\n`)

  // The signatures were verified: true

  let rawTransaction = manualTransaction.serialize();
  const base58Tx = bs58.encode(rawTransaction)
  console.log(`base58 tx: ${base58Tx}`)

})();

async function getProgramAddress(toWallet, tokenMintAddress) {
  const res = await web3.PublicKey.findProgramAddress(
    [
        toWallet.publicKey.toBuffer(),
        splToken.TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress,
    ],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
)
 return res[0].toBase58();
}