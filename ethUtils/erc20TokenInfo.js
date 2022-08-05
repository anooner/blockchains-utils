// 获取指定Token 标准信息 symbol、name、decimals、totalSupply等
/**
 * 示例
 * nvm use v14.17.0 && node ethUtils/erc20TokenInfo.js --chain bsc --contract 0x81d5791E65e0dB42687e2cAF205F14A5E550C2aF 
 */

import spinners from "cli-spinners";
import { program } from 'commander';
import ora from "ora";
import { initWeb3 } from "./initWeb3.js";

const spinner = ora("处理中...")
spinner.spinner = spinners.arrow3

program
    .option('-c, --chain <type>', 'choose chains')
    .option('-C, --contract <type>', 'contract address')

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

    spinner.succeed(`成功.`);
})()

async function isContract(to) {
    const code = await web3.eth.getCode(to);
    return (code.length > 2);
}

export async function tokenInfo(contract) {
    // name 
    const name = await web3Call(contract, encodeNameCall())
    spinner.info(`name:    ${web3.utils.hexToUtf8(name)}`)

    // symbol
    const symbol = await web3Call(contract, encodeSymbolCall())
    spinner.info(`symbol:  ${web3.utils.hexToUtf8(symbol)}`)

    // decimals
    console.log(`data: ${encodeDecimalsCall()}`)
    const result = await web3Call(contract, encodeDecimalsCall())
    spinner.info(`decinmal: ${result}`)
    const decimals = web3.utils.hexToNumber(result);
    spinner.info(`decimals: ${decimals}`)

    // totalSupply
    const total = await web3Call(contract, encodeTotalSupplyCall())
    spinner.info(`totalSupply: ${web3.utils.toBN(total).div(new web3.utils.toBN(10 ** decimals)).toString()}`)
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

function encodeDecimalsCall() {
    return web3.eth.abi.encodeFunctionSignature('decimals()')
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

 