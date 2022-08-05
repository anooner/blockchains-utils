import { Avalanche, BinTools, Buffer, BN, utils, avm } from "avalanche";
import createHash from "create-hash";

import bs58 from "bs58";

const address = '11111111LcYxteMXajyexQU66Lny4aVAXjPCECoh6JEygs2vfntLXLxLkaYQsWwvLzKsqcT9SRcawo6woc2AbbGspahyPhUXd56VX75afSYsvo9pae5DQ3oYCyPfQGn8sJom6aSt5dBzuStAhHA7KB2tTYHVcj3Wc8E5wepLE7S6QWVRm8WvQVdkBMG3Tvyhv69exkCGYDJjyWcs39MB75AfbmhWypSGvbSQPkK5cr7H8ouoG2r4Vk4n7atxkuGukxAMUaDnwKLF1i6Gjx8WS7XmiPiwQFKaDWDZwiohyiHKAUCSB3x3TQb96f821sMTM8SVBUZ2BHifnAWnwVgCseaMiLThWwT9sBGDWDHEqY6yKTkQrEaFRxEV48tRHjaAsRcm88m4UC4Jq1uegWgAK6fm4LJXykyaqjpPCf719DyRXesxudRA1NDVwn6pt3Xrk2YQ5f5KVZwrXZGEu35VQyWPWL2GceWtSZaRyfxECGjGRT727UMtHSvysuSAcwhfERsqVEfUtDDmVXy9UkuubdB'
const bytes = bs58.decode(address)
console.log(bytes)
// => 003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187

// AVALANCHE CODE FOR INSPECTING RAW TRANSACTIONS
const bintools = BinTools.getInstance();
const serializer = utils.Serialization.getInstance();
// const payloadtypes = utils.PayloadTypes.getInstance();

const d_hex = bintools.cb58Decode('EKEt4NkEmcMgGaxNZT5v8MMzHrcsQwxb77EghQfhK3S55yS9UmAk').toString('hex')
console.log(`\nb58: 2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed;\nhex: ${d_hex}`);


const en = bintools.cb58Encode(Buffer.from('37765310a9df1db9d3a01790f924fac018d6613f08220e8d2a9f6292da4507', 'hex'))
console.log(`\nhex: 37765310a9df1db9d3a01790f924fac018d6613f08220e8d2a9f6292da4507b2;\nb58: ${en}`);

const d_hex1 = bintools.cb58Decode('2SckbcoGiD2a7Qf3bNji2Gik6cAvCGdorcyWTXnmAr1oLPSkGa').toString('hex')
console.log(`\nb58 2SckbcoGiD2a7Qf3bNji2Gik6cAvCGdorcyWTXnmAr1oLPSkGa;\nhex: ${d_hex1}`);


const d_hex2 = bintools.cb58Decode('mcb97kVJG1vxiaE5SNQ78C2uNWYfXBYaepX9nvMK81hLiV5DX').toString('hex')
console.log(`\nb58 mcb97kVJG1vxiaE5SNQ78C2uNWYfXBYaepX9nvMK81hLiV5DX\nhex: ${d_hex2}`);


const d_hex3 = bintools.cb58Decode('2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe').toString('hex')
console.log(`\nb58: 2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe;\nhex: ${d_hex3}`);

const d_hex4 = bintools.cb58Decode('2CfBxgZiy6t23AogqMyTpmen88fQ6u4FYWHiNxtHUBpofDzSnT').toString('hex')
console.log(`\nb58: 7PwuUpXKuUuiq9PT7kHaY2rwhrsjtZDiQ5Rn93tonousjDBNB2;\nhex: ${d_hex4}`);

const encode = bintools.cb58Encode(Buffer.from('f86280808252089447665be92c18c2580ff7d65601db909a35b4467a8080830150f7a03be6076548a581cff5818cd67ee506eed8ace100f6b5adf86de5374739131801a01c83d41aedddae2498677a54f3c92a300fa51d78bac9c8d3683a1d8838ad6055', 'hex'))
console.log(`\nhex: ;\nb58: ${encode}`);


