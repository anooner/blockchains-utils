import Web3 from "web3";
import { CHAIN_CONFIG } from "./config.js";

export function initWeb3(chain) {
    return new Web3(new Web3.providers.HttpProvider(CHAIN_CONFIG[chain]))
}