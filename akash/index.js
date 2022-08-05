const akash = require("@cosmjs/launchpad");
const { coins, DirectSecp256k1HdWallet, Registry } =  require("@cosmjs/proto-signing");
const { defaultRegistryTypes, SigningStargateClient } = require("@cosmjs/stargate");
// const {akashStargate} =  require("@akashnetwork/akashjs");

(async () => {
    const wallet = await akash.Secp256k1Wallet.fromKey(Buffer.from("ba22676722c96fbd533ce3f974b2b266d08858b99eb186ed5d2ee17568ae68eb", 'hex') ,"akash");
    const [account] = await wallet.getAccounts();
    const {address, pubkey} = account;
    console.log(address);
    
    // Setup a send message manually. See the appropriate repo (cosmjs in this case)
    // for the specific shape of the message.
    const message = {
        fromAddress: account.address,
        toAddress: "akash15adtj5anlw028j8xj8x3tutz6ycxpenn22hhsq",
        amount: coins(100, "akt"),
    };

    // Set the appropriate typeUrl and attach the encoded message as the value
    const msgAny = {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: message
    };

    // You can use your own RPC node, or get a list of public nodes from akashjs
    const rpcEndpoint = "http://akash-sentry01.skynetvalidators.com:26657";

    const myRegistry = new Registry([
        ...defaultRegistryTypes,
    ]
    );
    console.log(JSON.stringify(myRegistry))

    const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        wallet,
        {
            registry: myRegistry
        }
    ).catch(err => {
        console.log('client err: ', err)
    });

    const fee = {
        amount: [
            {
                denom: "uakt",
                amount: "5000",
            },
        ],
        gas: "800000",
    };

    const msg = await client.sign(
        account.address,
        [msgAny],
        fee,
        "send some tokens"
    ).catch(err => {
        console.log()
    });
    console.log("msg: ", msg)

})()

    