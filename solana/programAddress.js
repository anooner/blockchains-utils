const web3 =require('@solana/web3.js');
const {TOKEN_PROGRAM_ID}=require('@solana/spl-token');
var bs58 = require('bs58');

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);

(async () => {
    const seed = Buffer.from('721a9ddfe117e27196ca4bfce2b0d725f3bf75233e895050508c940f4c63e6ed', 'hex')
    const fromWallet = web3.Keypair.fromSeed(seed)

    let toWallet = web3.Keypair.fromSeed(Buffer.from("a0a0683636530d2757d517e12ac81347e4c4b2780ed2f522bea61c248e630062", 'hex'));

    // Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB
    const tokenMintAddress = bs58.decode("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")

    const res = await web3.PublicKey.findProgramAddress(
        [
            toWallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMintAddress,
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
    console.log(res[0].toBase58())

    const res2 = await web3.PublicKey.findProgramAddress(
        [
            new web3.PublicKey("5VNuN6bHEF8YvXDxFUezwKBLXg7U6XgtqcJQvPhzGQe9").toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMintAddress,
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
    console.log(res2[0].toBase58())
})()