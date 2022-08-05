import { Avalanche, BinTools, Buffer, BN, utils, avm } from "avalanche";
import createHash from "create-hash";
import { readFile } from 'fs';
import bs58 from "bs58";
import { assert } from "console";

const bintools = BinTools.getInstance();
const serializer = utils.Serialization.getInstance();
const payloadtypes = utils.PayloadTypes.getInstance();

// readFile('./226in-hex', (err, data) => {
//   if (err) throw err;
//   // const dataStr = data.toString();
//   console.log('data string:', data.toString());
//   console.log('size: ', Buffer.byteLength(data))

//   console.log('to b58 buffer start...')
//   const bdata = Buffer.from(dataStr, 'hex')
//   // const bdata = bs58.decode(dataStr)
//   // const bdata = bintools.cb58Decode(dataStr)
//   // let txbuff = serializer.typeToBuffer(dataStr, "cb58");
//   // const bdata = bintools.b58ToBuffer(dataStr);
//   console.log('to b58 buffer end...: ', bdata);
//   // let txbuff = serializer.typeToBuffer(data.toString('utf8'), "cb58");
//   const txid = txID(bdata)
//   console.log('txid: ', txid);

//   // const bdata = Buffer.from(dataStr)
//   const txs= decodeRawTx(bdata, 'cb58')
//   console.log(JSON.stringify(txs))
// });

// AVALANCHE CODE FOR INSPECTING RAW TRANSACTIONS


const txID = (txBytes) =>
  bintools.cb58Encode(createHash("sha256").update(txBytes).digest());

function decodeRawTx(rawTx, encoding) {
  // const txbuff = rawTx
  // let txbuff = serializer.typeToBuffer(rawTx, encoding);
  const txbuff = Buffer.from(rawTx, 'hex')
  console.log("type to buffer...");
  const signedAvmTx = new avm.Tx();
  signedAvmTx.fromBuffer(txbuff);
  const memo = signedAvmTx.unsignedTx.transaction.getMemo();
  const transaction = signedAvmTx.unsignedTx.getTransaction()
  const txbuffer = signedAvmTx.toBuffer()
  console.log('signex tx buffer: ', txbuffer);
  const txid = txID(txbuffer)
  assert(txbuff === txbuffer, "buffer equal")
  //parse address
  const tx = {
      txid: txid,
      memo: memo.toString('hex'),
      transaction: transaction.serialize('hex')
  }

  return tx
}

// const raw = '11111111LcYxteMXajyexQU66Lny4aVAXjPCECoh6JEygs2vfntLXLxLkaYQsWwvLzKsqcT9SRcawo6woc2AbbGspahyPhUXd56VX75afSYsvo9pae5DQ3oYCyPfQGn8sJom6aSt5dBzuStAhHA7KB2tTYHVcj3Wc8E5wepLE7S6QWVRm8WvQVdkBMG3Tvyhv69exkCGYDJjyWcs39MB75AfbmhWypSGvbSQPkK5cr7H8ouoG2r4Vk4n7atxkuGukxAMUaDnwKLF1i6Gjx8WS7XmiPiwQFKaDWDZwiohyiHKAUCSB3x3TQb96f821sMTM8SVBUZ2BHifnAWnwVgCseaMiLThWwT9sBGDWDHEqY6yKTkQrEaFRxEV48tRHjaAsRcm88m4UC4Jq1uegWgAK6fm4LJXykyaqjpPCf719DyRXesxudRA1NDVwn6pt3Xrk2YQ5f5KVZwrXZGEu35VQyWPWL2GceWtSZaRyfxECGjGRT727UMtHSvysuSAcwhfERsqVEfUtDDmVXy9UkuubdB'
// const txs= decodeRawTx(raw, 'cb58')
// console.log(JSON.stringify(txs))
// console.log(txs.serializedTX.unsignedTx.transaction.outs[0]);

// const tx_raw = serializer.typeToBuffer('111111112VZv5gwsbyvh4XYaZUaMtSnoK4e4xZH75xP6hCwqVtDXbAw5GBM3eMyBQTE2KPZUQFDe4prVEtha9MgH5K1mquBeWAD5EssqDafmhnShw1UuScjJXnV4HKeQM35cSM64dTLUeUjEMSpB5ruFBaWNcD2ugGtbmBn9axJbpzGTAUqbeB3q9PiLqs5E5oMFSDNnAEc6syXNZMknFizrTmesq9YUJPGd65AM9vVJKt2zAtZmiBeWcgZcLnsxdr7TxRpg6wWkviaGsmzdvc39v18WatFejrYKdCABBFfTw2xJ335Ed54kH4i2bSSWwbtoq3Nc4vpJf6ZUCYzwNVUXAtPY4K78CPTA6kVZz91y5QgoNKiQo91t2wYscsr1jaQ6TN2yJ5HsNeYy9rbh1Zx9Cn1kTPXPBnYEaBp7sftDqdPefWBChrtYct3VCZN47v58z6jYGQm4ANSG5T21tNJr8yypnC4m7ft68dsDues5cwZaQD7xQgEocEPsC9QnCzkVcpmc9zF3GyHPcVTCehJFc', 'cb58')
// console.log(txID(tx_raw));

const txrawhex = '00000000000000000001ed5f38341e436e5d46e2bb00b45d62ae97d1b050c64bc634ae10626739e35c4b0000000121e67317cbc4be2aeb00677ad6462778a8f52274b9d605df2591b23027a87dff0000000700000048a27bc5b100000000000000000000000100000001921b4bcbf7261303fffc9a1bbe12e3388104a01600000001ff21a24441e77ce64d836c8f3e899c417cbec348a85878030a024187026706f10000000021e67317cbc4be2aeb00677ad6462778a8f52274b9d605df2591b23027a87dff0000000500000048a28b07f1000000010000000000000000000000010000000900000001911e551ddf2788eb5db8abb22761538c8c39449bbeb9a76ff4f3860564f136ef501d06f1e83d5a1b977ada0261baac594aaefdfdbcf6ee9ac472aed93db0019a015f692db5'
const txs= decodeRawTx(txrawhex, 'hex')
console.log('tx: ', txs);

// console.log('type to buffer: ', serializer.typeToBuffer(txrawhex, 'hex'))
// console.log('hex to buffer: ', )
const txid = bintools.cb58Encode(createHash("sha256").update(Buffer.from(txrawhex, 'hex')).digest());
console.log('txid: ', txid)
