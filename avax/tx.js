import { Avalanche, BinTools, Buffer, BN, utils, avm } from "avalanche";

const bintools = BinTools.getInstance()

const myNetworkID = 12345; //default is 1, we want to override that for our local network
const myBlockchainID = 'X'
const blockchainId = utils.Defaults.network['12345'].X.blockchainID
const avalanche = new Avalanche("127.0.0.1", 9650, "http", myNetworkID, myBlockchainID);
const xchain = avalanche.XChain(); //returns a reference to the X-Chain used by AvalancheJS

console.log('blockchainID: ', xchain.getBlockchainID());
console.log('blockchainID: ', blockchainId);
console.log('networkID: ', xchain.getRPCID());
console.log('getBlockchainAlias: ', xchain.getBlockchainAlias());


// new utxo from raw_byte
const u1= new avm.UTXO()
u1.fromString('11ynH6gmgb5mr3V2B1xfiTD7djAE48hZF6NsVrN3pm45RuXoveqsjNq2R3TVgWLiquytRdmpzW6UuvfoAg5jLDVeZR8VgHrGU9PbHpAUYkoAKsuf4Mq1sFBZnJWq3YPudvdyhinA5sBw7vybjn5meHKXcdVCZgAMiZc9d')
const u2= new avm.UTXO()
u2.fromString('11SmugtFswdfFcbWgp3DwJLMUgLo5kunRDZRXXox1DmtxCLt2rGZQAqzWa3M7RTWM9XfUL8jCMMpDMtbsUxoFoCVhdc6J1zxnzkhiyFA4zhevPkpwKNyjk573CvwQdBCDV2nmRx1RquehfRoByun4G84yWPwNrJRJpQfoG')

const utxos = new avm.UTXOSet()
utxos.add(u1)
utxos.add(u2)

// new utxo from object
// 创建 utxo
// const str_to_addr = bintools.stringToAddress('X-local1he8wfm4ha2xjtt88uaqswcmtugffkdjufyntnx', 'local')
// const addresses = [str_to_addr]

// const output = new avm.SECPTransferOutput(
//     new BN(96400000),
//     addresses, 
//     new BN(0),
//     1)
// const u1= new avm.UTXO(
//     0,
//     Buffer.from("07101657ef936956f2c8f81a5ed2400875d7fadb75beb61e1d59781974e90456", 'hex'),
//     1,
//     Buffer.from('dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db', 'hex'),
//     output
// )

// const us = await xchain.getUTXOs(['X-local1yxdvhm976xeadk725fc75yy7g7c3la5v65n0cw']);
// const utxos = us.utxos
// console.log(JSON.stringify(utxos));
utxos.getAddresses().forEach(add_b => {
    const hex_to_addr = bintools.addressToString('local', 'X', add_b)
    console.log('addresses:', hex_to_addr)  
});
const assetid = '2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe'
// console.log(utxos.getBalance(['X-local1he8wfm4ha2xjtt88uaqswcmtugffkdjufyntnx'], assetid));
const sendAmount = new BN('12310000')
const toAddresses = ["X-local1yxdvhm976xeadk725fc75yy7g7c3la5v65n0cw"]
const fromAddresses = ["X-local1zr9lacynftnnd00y03nxadjjpnusul6tnx33fr"]
const changeAddresses = ["X-local1he8wfm4ha2xjtt88uaqswcmtugffkdjufyntnx"]
const memo = Buffer.from('bitmart locktime', 'utf-8')
const locktime = new BN(0)
const asof=  new BN(0)
const threahold = 1
const unsignedTx = await xchain.buildBaseTx(utxos, sendAmount,assetid, toAddresses, fromAddresses, changeAddresses, memo, asof, locktime, threahold);
console.log('unsigned raw: ', JSON.stringify(unsignedTx.serialize('hex')));

// // unsigned raw to hex string
const unsignedRawHexStr = unsignedTx.toBuffer().toString('hex')
console.log('unsigned raw hex: ', unsignedRawHexStr);

// // new unsigned tx from buffer
// /*
// const unsigned_tx = new avm.UnsignedTx()
// unsigned_tx.fromBuffer(Buffer.from(unsignedRawHexStr, 'hex'))
// console.log(unsigned_tx.toBuffer().toString('hex'))
// */

const kc = new avm.KeyChain("local", myNetworkID)
// // const kc = xchain.keyChain()
// // kc.importKey('PrivateKey-Nvw7qNsANEG6x5HfemEa5dLjtraJ1BJKYZLF5YFsirwWbeDr4')
kc.importKey(Buffer.from("0e03772a48e024b6e9cd82c9df69593409099b514ae9c475e034a47524f51928", 'hex'))

const signedTx = unsignedTx.sign(kc);
console.log(`signed tx: ${JSON.stringify(signedTx.serialize('cb58'))}`);

//  signed transaction to string
const signedTxB58Str = signedTx.toString()
console.log(`signedTxB58Str: ${signedTxB58Str}`)

// const txid = await xchain.issueTx(signedTx);
