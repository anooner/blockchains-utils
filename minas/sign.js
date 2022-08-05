const CodaSDK = require("@o1labs/client-sdk");

const bs58 = require("bs58");

let keys = {}

keys.privateKey = "EKEmbHS2kwRBqLE2WDWHaA9vgsFJW5C8JWPkBHQkKfg54FA2dF2Z"
keys.publicKey = CodaSDK.derivePublicKey(keys.privateKey); // B62qoyXvV5MA7siFYjNPyAZjdgKKw5HKvmYAiVZVss72X8YsgEZWEky

console.log('privkey: ', keys.privateKey)
console.log('pubkey: ', keys.publicKey)

let signed = CodaSDK.signMessage("hello", keys);
if (CodaSDK.verifyMessage(signed)) {
    console.log("Message was verified successfully")
};

// 转账精度 decimal=9
const signedPayment = CodaSDK.signPayment({
    to: "B62qkmERmFmyC4DkCHBerxkeEJUCty8oh5V6qyUDskjCuXokkiKEykF",
    from: keys.publicKey,
    amount: 10**7,
    fee: 12345678,
    nonce: 2
  }, keys);
const verify_sign = CodaSDK.verifyPaymentSignature(signedPayment);
console.log('signge: ', verify_sign)
  // const hashPayment = CodaSDK.hashPayment(signedPayment)
  // console.log('hash: ', hashPayment)


console.log('signedPayment: ', JSON.stringify(signedPayment, null, 2))