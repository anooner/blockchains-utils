import { Avalanche, BinTools, Buffer, BN, utils, avm } from "avalanche";
const bintools = BinTools.getInstance()

const utxo = new avm.UTXO()
utxo.fromString("11MeZvZ1aXGxhfk7ACbmH6n35UZkqqpock764ee9MnmGLPGtsa4eAF1C1wJLbPBHMmhpgidzg9uotnQ98Ne5XpEkRkvGCvkDn3LvkPn5a1yGpamwoUDscqQhwq2DNkEUxSDSZgxuiJj4Mb5wiLQbmYRkG5msJ3V4uMcZA8");
const s_u = utxo.serialize('hex')
console.log(`${JSON.stringify(s_u)}`);

const str_to_addr = bintools.stringToAddress('X-local1he8wfm4ha2xjtt88uaqswcmtugffkdjufyntnx', 'local')
const addresses = [str_to_addr]

// const output = new avm.SECPTransferOutput(
//     new BN(109700000),  // amount
//     addresses,          // address
//     new BN(0),          // locktime
//     1,                  // threhold 
//     )
// console.log('addresses: ', output.getAddress(0).toString('hex'));
// // 创建 utxo
// const u1= new avm.UTXO(
//     // codeID 
//     0,
//     // txid
//     Buffer.from("5b9a05353c865785abf5ce0bb0e7e8ec374a56a68cd839142384fa509766e8b5", 'hex'),
//     // outputindex
//     1,
//     // assertid
//     Buffer.from('dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db', 'hex'),
//     output
// )

// const s_u2 = u1.serialize()
// console.log(`${JSON.stringify(s_u2)}`);
