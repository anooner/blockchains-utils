
import { avm, BinTools, Buffer } from "avalanche";
import { config } from "./config.js";


// AVALANCHE CODE FOR INSPECTING RAW TRANSACTIONS
const myNetworkID = config.networkID;
const HRP = config.HRP
const bintools = BinTools.getInstance()

const kc = new avm.KeyChain(HRP, myNetworkID)
const newKey= kc.makeKey()
console.log(newKey.getAddressString());
newKey.setHRP('local')
console.log(newKey.getAddressString());

const b_key = kc.importKey('PrivateKey-Nvw7qNsANEG6x5HfemEa5dLjtraJ1BJKYZLF5YFsirwWbeDr4')
console.log(b_key.getAddressString());

const addr = bintools.parseAddress('X-local1euv6ugmumldn87pk787wlxdywvarncpya200s0', 'X').toString('hex')
console.log('parse address: ', addr);

// 地址转hex 
const str_to_addr = bintools.stringToAddress('X-avax1he8wfm4ha2xjtt88uaqswcmtugffkdjushwdsw')
console.log('str to addr buffer: ', str_to_addr.toString('hex'));

// hex 转地址
const addr_b = Buffer.from('e55c1c90e35a9e5e01da0022aa36a11d34a8f89c', 'hex')
const hex_to_addr = bintools.addressToString('avax', 'X', addr_b)
console.log(`hex to addr: ${hex_to_addr}`);


const import_key = kc.importKey(Buffer.from("0e03772a48e024b6e9cd82c9df69593409099b514ae9c475e034a47524f51929", 'hex'))
console.log('new: ', import_key.getAddressString())
console.log(import_key.getPrivateKeyString());
// console.log();
const d_hex4 = bintools.cb58Decode(import_key.getPublicKeyString()).toString('hex')
console.log(`pubkey-hex: ${d_hex4}`)
/** 测试地址
 * 0e03772a48e024b6e9cd82c9df69593409099b514ae9c475e034a47524f51929 X-local1he8wfm4ha2xjtt88uaqswcmtugffkdjufyntnx
 * 0e03772a48e024b6e9cd82c9df69593409099b514ae9c475e034a47524f51928 X-local1zr9lacynftnnd00y03nxadjjpnusul6tnx33fr
 */