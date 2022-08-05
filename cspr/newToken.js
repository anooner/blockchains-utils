const { InitialStates } = require("avalanche/dist/apis/avm");
const {ERC20Client} = require("casper-erc20-js-client");
const {Keys} = require("casper-js-sdk");

(async () => {
    // init erc20 
    const erc20 = new ERC20Client(
        "https://node-clarity-mainnet.make.services:443/rpc", // RPC address
        "casper", // Network name
        // "https://node-clarity-mainnet.make.services/events/main" // Event stream address
      );
      const key = Keys.Ed25519.new();
      const signKeyPair2 = Keys.Ed25519.parseKeyFiles(
        '/Users/tianlele/Documents/Bitmart/develop/avax/avax_util/cspr/public.pem',
        '/Users/tianlele/Documents/Bitmart/develop/avax/avax_util/cspr/private.pem'
      );

      console.log(Buffer.from(signKeyPair2.privateKey).toString("hex"))
      console.log(signKeyPair2.publicKey.toHex())

      const installDeployHash = await erc20.install(
        signKeyPair2, // Key pair used for signing 
        "ACME Token", // Name of the token
        "ACME", // Token Symbol
        10, // Token decimals
        1000000000000000, // Token supply
        200000000000, // Payment amount
        "/Users/tianlele/Documents/Bitmart/develop/avax/avax_util/cspr/erc20_token.wasm" // Path to WASM file
      ).catch(err => {
          console.log("err: ", err.toString())
      });
      console.log("installDeployHash, ", installDeployHash)

    await erc20.setContractHash(installDeployHash);
    
    const name = await erc20.name();

    const symbol = await erc20.symbol();

    const totalSupply = await erc20.totalSupply();

    const decimals = await erc20.decimals();

    console.log(`name: ${name}, symbol: ${symbol}, total: ${totalSupply}, deciaml: ${decimals}`)
})()