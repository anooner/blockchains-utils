const CodaSDK = require("@o1labs/client-sdk");
const crypto = require('crypto')
const bs58 = require("bs58");

// WPK = version (2 bytes = 5a01) + privkey(32 bytes) + checksum(4 bytes)
// version = 5a01 
// privkey = 
// checksum = digest = sha256(sha256(v).digest()).digest()

const version = '5a01'

function sha256(rawdata) {
    return crypto.createHash('sha256').update(rawdata).digest()
}

function toBuffer(str) {
    return Buffer.from(str, 'hex')
}

function doubleHash(data) {
    const byteData = toBuffer(data);
    const hashData = sha256(sha256(byteData));
    return hashData.toString('hex');
}

(() => {
    const pk = '8da9a3584b464cc90441ba24cd33d9ba8d2a362e0652c071e1f9ccf05acb0d53'

    console.log('doublehash: ', doubleHash(version + pk))

    console.log('new priv: ', bs58.decode("EKEmbHS2kwRBqLE2WDWHaA9vgsFJW5C8JWPkBHQkKfg54FA2dF2Z").toString('hex'))

    const fPK = version + pk + doubleHash(version + pk).substr(0, 8)
    console.log('fPK: ', fPK)
    // console.log('dddd: ', bs58.encode(Buffer.from('5a0124be1043982633b78b00d4e0e347829daab624d4d4dca5c91cbc3d659cf5740a912456f2', 'hex')))
    console.log('WPK: ', bs58.encode(toBuffer(fPK)))

    const keys = {}
    keys.privateKey = "EKEmbHS2kwRBqLE2WDWHaA9vgsFJW5C8JWPkBHQkKfg54FA2dF2Z"
    console.log('privkey => b58 ', bs58.decode(keys.privateKey).toString('hex'))

    keys.publicKey = CodaSDK.derivePublicKey(keys.privateKey)
    console.log('pubkey: ', keys.publicKey)
})()
