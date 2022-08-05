const Arweave = require('arweave');

(async () => {
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
      });

    const jwk = await arweave.wallets.generate();
    console.log(`${JSON.stringify(jwk)}`)
    const address = await arweave.wallets.jwkToAddress(jwk)
    console.log(`address: ${address}`)

    
})()