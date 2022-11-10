import { Avalanche, BinTools, Buffer, BN, utils, avm } from "avalanche";

(async ()=> {
    const ip = "10.95.1.98"
    const port = 9650
    const protocol = "http"
    const networkID = 5
    const avalanche = new Avalanche(ip, port, protocol, networkID)
    const pchain = avalanche.PChain()
    console.log(`chainID: ${pchain.getBlockchainID()}`)

    const pKeychain = pchain.keyChain()
    const privKey = Buffer.from('0e03772a48e024b6e9cd82c9df69593409099b514ae9c475e034a47524f51929', 'hex')
    pKeychain.importKey(privKey)
    const pAddressStrings= pchain.keyChain().getAddressStrings()
    console.log(`pAddressStrings: ${pAddressStrings}`)

    const threshold = 1
    const locktime = new BN(0)
    const memo = Buffer.from(
        "PlatformVM utility method buildAddValidatorTx to add a validator to the primary subnet")
    const asOf = utils.UnixNow()
    const nodeID = await avalanche.Info().getNodeID()
    console.log(`nodeID: ${nodeID}`)

    const startTime = utils.UnixNow().add(new BN(60 * 1))
    const endTime = startTime.add(new BN(3600 * 24))

    console.log(`startAt: ${startTime}, endAt: ${endTime}`)

    const delegationFee = 2

    const stakeAmount = await pchain.getMinStake()
    console.log(`stakeAmount: ${JSON.stringify(stakeAmount)}`)

    const platformVMUTXOResponse = await pchain.getUTXOs(pAddressStrings, pchain.getBlockchainID(), 1)
    console.log(`platformVMUTXOResponse: ${JSON.stringify(platformVMUTXOResponse)}`)

    const utxoSet = platformVMUTXOResponse.utxos
    console.log(`utxoSet: ${JSON.stringify(utxoSet)}`)

    const unsignedTx = await pchain.buildAddValidatorTx(
        utxoSet,
        pAddressStrings,
        pAddressStrings,
        pAddressStrings,
        nodeID,
        startTime,
        endTime,
        stakeAmount.minValidatorStake,
        pAddressStrings,
        delegationFee,
        locktime,
        threshold,
        memo,
        asOf
    )

    const tx = unsignedTx.sign(pKeychain)
    console.log(`signed tx: ${JSON.stringify(tx.serialize('cb58'))}`);

    //  signed transaction to string
    const signedTxB58Str = tx.toString()
    console.log(`signedTxB58Str: ${signedTxB58Str}`)
    
      const txid = await pchain.issueTx(tx)
    console.log(`Success! TXID: ${txid}`)

})()