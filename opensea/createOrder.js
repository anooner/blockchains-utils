import * as Web3 from 'web3'
import { OpenSeaSDK, Network } from 'opensea-js'

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

const openseaSDK = new OpenSeaSDK(provider, {
    networkName: Network.Main,
    apiKey: YOUR_API_KEY
})

const order = await openseaSDK.api.getOrder({ side: "bid", ... })
const accountAddress = "0x..." // The owner's wallet address, also the taker
await openseaSDK.fulfillOrder({ order, accountAddress })