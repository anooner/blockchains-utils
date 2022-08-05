const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

(async () => {
  // Connect to cluster
  const connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed',
  );

  // J29963ZFJrsmtqNYc9gpEjCaPrrjR6p64iuB9tCJEvSm  
  // N7LrgZ63KdWKzjJLp1nnpDsnKh3JauvTtEDNrjmTqtk
  const seed = Buffer.from('721a9ddfe117e27196ca4bfce2b0d725f3bf75233e895050508c940f4c63e6ed', 'hex')
  const fromWallet = web3.Keypair.fromSeed(seed)

  // 6L8AbAfpyNAHpkVuKQDXhKyCP3KJUSQox8sLb8Lxpxvn
  // DqcMdMbKu3EPWLtmUjZqPcxFgSArRgdy8mVowcYuQKhN
  let toWallet = web3.Keypair.fromSeed(Buffer.from("a0a0683636530d2757d517e12ac81347e4c4b2780ed2f522bea61c248e630062", 'hex'));
  
  // Generate a new wallet keypair and airdrop SOL
  
  var fromAirdropSignature = await connection.requestAirdrop(
    fromWallet.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  // Wait for airdrop confirmation
  await connection.confirmTransaction(fromAirdropSignature);

  // Create new token mint
  const mint = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    9,
    splToken.TOKEN_PROGRAM_ID,
  );
  console.log(`mint: ${mint.publicKey}`)

  const fromProgramAddress = await getProgramAddress(fromWallet, mint.publicKey.toBuffer())
  console.log(`fromProgramAddress: ${fromProgramAddress}`)

  // get account Info 
  const fromAccountInfo = await mint.getAccountInfo(new web3.PublicKey(fromProgramAddress)).catch(err => {
      console.log(`getAccountInfo error: ${err.toString()}`)
  })
//   console.log(`fromAccountInfo: ${fromAccountInfo.address} ${fromAccountInfo.amount}`)

  // Get the token account of the fromWallet Solana address, if it does not exist, create it
  const fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey,
  );
  console.log(`fromtokenaccount: ${fromTokenAccount.address} ${fromTokenAccount.amount}`)

  // Minting 1 new token to the "fromTokenAccount" account we just returned/created
  await mint.mintTo(
    // token 初始化地址
    new web3.PublicKey(fromProgramAddress),
    fromWallet.publicKey,
    [],
    10000 * 10**9,
  );
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