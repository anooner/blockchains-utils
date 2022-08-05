const solanaWeb3 = require('@solana/web3.js');
// const Keypair = solanaWeb3.Keypair

(() => {
    // const secretKey = Buffer.from(
    //     'mdqVWeFekT7pqy5T49+tV12jO0m+ESW7ki4zSU9JiCgbL0kJbj5dvQ/PqcDAzZLZqzshVEs01d1KZdmLh4uZIg==',
    //     'base64',
    //   );
    // const secretKey = Buffer.from('bb8bc45489278ded23c1454f6e969294f808d8b56d67c15e8591a1c249fdbeb973aadcc9e2a7fabd2fd550d3f0a2b46a1928c97e401819c0840a47d21848b889', 'hex')
    // console.log(`${secretKey.toString('hex')}, len:${secretKey.length}`)
    // const keypair = solanaWeb3.Keypair.fromSecretKey(secretKey)
    // console.log(keypair.publicKey.toString())
    // console.log(keypair.publicKey.toBase58())

    const keypair2 = solanaWeb3.Keypair.generate();
    console.log(`random secretkey: ${keypair2.secretKey} pubkey: ${keypair2.publicKey.toString()}`)
    
    const seed = Buffer.from('1591f12964dd4ba5e5e3ddf74f2d977481180d6d41c6cfc748e670335bfc4d52', 'hex')
    const k3 = solanaWeb3.Keypair.fromSeed(seed)
    const secretKeyHex = Buffer.from(k3.secretKey).toString('hex')
    console.log(`from seed secretkey: ${secretKeyHex} pubkey: ${k3.publicKey.toString()}`)
    console.log(`k3: ${k3.publicKey.toBase58()}\ntoString: ${k3.publicKey.toString()}\ntohex: ${k3.publicKey.toBuffer().toString('hex')}`)
    // J29963ZFJrsmtqNYc9gpEjCaPrrjR6p64iuB9tCJEvSm
})()

/**
 * 721a9ddfe117e27196ca4bfce2b0d725f3bf75233e895050508c940f4c63e6ed
 * J29963ZFJrsmtqNYc9gpEjCaPrrjR6p64iuB9tCJEvSm
 * 
 * a0a0683636530d2757d517e12ac81347e4c4b2780ed2f522bea61c248e630062
 * 6L8AbAfpyNAHpkVuKQDXhKyCP3KJUSQox8sLb8Lxpxvn
 * 
 * 1591f12964dd4ba5e5e3ddf74f2d977481180d6d41c6cfc748e670335bfc4d52
 * CRGaYDSN96upEmC216ApZDx1EEGPM7oMerY5Yni2vB7v
 */