const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const {FireblocksSDK, PeerType, TransactionArguments, TransactionOperation, TransactionStatus} = require("fireblocks-sdk");

apiSecret = fs.readFileSync(path.resolve(__dirname, "/Users/tianlele/fireblocks_secret.key"), "utf8");
const apiKey = "d916802f-6b56-97eb-de4d-2a9eb9b0a7a4";
const fireblocks = new FireblocksSDK(apiSecret, apiKey);

(async () => {
    const dhash = crypto.createHash('sha256').update(Buffer.from("0x123", 'hex')).digest('hex');
    console.log(`hash: ${dhash}`)

    const vaultAccounts = await fireblocks.getVaultAccounts();
    console.log(JSON.stringify(vaultAccounts))
   
    // create raw tx
    const bip44addressIndex = 0
    const content = dhash;
    const args = {
        operation: TransactionOperation.RAW,
        assetId: "BTC_TEST",
        source: {
            type: PeerType.VAULT_ACCOUNT,
            id: "0"
        },
        note: `BTC Message:`,
        extraParameters: {
            rawMessageData: {
                messages: [{
                    content,
                    bip44addressIndex
                }]
            }
        }
    }
    const {status, id} = await fireblocks.createTransaction(args).catch(err => {
        console.log(err);
    });
    console.log(`status: ${status}, id: ${id}`)
})()
