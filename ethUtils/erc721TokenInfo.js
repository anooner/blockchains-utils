// 获取指定Token 标准信息 symbol、name、decimals、totalSupply等
/**
 * 示例
node ethUtils/erc721TokenInfo.js \
--chain=eth \
--contract=0x565AbC3FEaa3bC3820B83620f4BbF16B5c4D47a3 \
--tokenId=756
 */

import axios from 'axios';
import spinners from "cli-spinners";
import { program } from 'commander';
import ora from "ora";
import { initWeb3 } from "./initWeb3.js";

const spinner = ora("处理中...")
spinner.spinner = spinners.arrow3

program
    .option('-c, --chain <type>', 'choose chains')
    .option('-C, --contract <type>', 'contract address')
    .option('-d, --tokenId <type>', 'token id', 0)

const argvs = program.parse(process.argv);

let web3

(async () => {
    spinner.start();
    const opts = argvs.opts();
    web3 = initWeb3(opts.chain);
    const contract = opts.contract.toLowerCase();
    const c = await isContract(contract);
    if (!c) {
        spinner.fail(`不是合约地址: ${contract}`)
        process.exit()
    }
    await tokenInfo(contract)

    // token URI
    const uri = await web3Call(contract, encodeTokenURICall())
    const ipfs = web3.utils.hexToUtf8(uri);
    // 替换IPFS
    const items = ipfs.split('//')
    const tokenURI = "https://ipfs.io/ipfs/" + items[items.length - 1]
    spinner.info(`uri: ${tokenURI}`)
    // await getTokenInfoFromURI(tokenURI)
    spinner.succeed(`成功.`);
})()

async function isContract(to) {
    const code = await web3.eth.getCode(to);
    return (code.length > 2);
}

export async function tokenInfo(contract) {
    // name 
    const name = await web3Call(contract, encodeNameCall())
    spinner.info(`name:   ${web3.utils.hexToUtf8(name)}`)

    // symbol
    const symbol = await web3Call(contract, encodeSymbolCall())
    spinner.info(`symbol: ${web3.utils.hexToUtf8(symbol)}`)
}

async function getTokenInfoFromURI(uri) {
    const res = await axios.get(uri).catch(err => {
        spinner.warn(`获取Token信息失败: ${uri}`)
        process.exit()
    })
    spinner.info(`token uri: \n${JSON.stringify(res.data, null, 3)}`)
}

async function web3Call(contract, data) {
    return await web3.eth.call({
        to: contract,
        data: data
    }).catch(err => {
        spinner.fail(`获取data错误: \n${err.toString()}`)
        process.exit();
    })
}

function encodeTokenURICall(tokenId) {
    const BN = web3.utils.BN;
    return web3.eth.abi.encodeFunctionCall({
        name: 'tokenURI',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: 'tokenId'
        }]
    }, [new BN(tokenId)]);
}

function encodeNameCall() {
    return web3.eth.abi.encodeFunctionSignature('name()')
}

function encodeSymbolCall() {
    return web3.eth.abi.encodeFunctionSignature('symbol()')
}

function encodeTotalSupplyCall() {
    return web3.eth.abi.encodeFunctionSignature('totalSupply()')
}


/**
 * ERC20 interface
     event Transfer(address indexed from, address indexed to, uint256 value);

     event Approval(address indexed owner, address indexed spender, uint256 value);
 
     function totalSupply() external view returns (uint256);
 
     function balanceOf(address account) external view returns (uint256);
 
     function transfer(address to, uint256 amount) external returns (bool);
 
     function allowance(address owner, address spender) external view returns (uint256);
 
     function approve(address spender, uint256 amount) external returns (bool);

     function transferFrom(
         address from,
         address to,
         uint256 amount
     ) external returns (bool);
 } 
 */

