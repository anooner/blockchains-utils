// 获取指定Token 标准信息 symbol、name、decimals、totalSupply等
/**
 * 示例
 * nvm use v14.17.0 && node ethUtils/tokenInfo.js --chain bsc --contract 0x81d5791E65e0dB42687e2cAF205F14A5E550C2aF 
 */

import spinners from "cli-spinners";
import { program } from 'commander';
import ora from "ora";
import { initWeb3 } from "./initWeb3.js";

const spinner = ora("处理中...")
spinner.spinner = spinners.arrow3

program
    .option('-c, --chain <type>', 'choose chains')
    // .option('-C, --contract <type>', 'contract address')

const argvs = program.parse(process.argv);

let web3

(async () => {
    spinner.start();
    const opts = argvs.opts();
    web3 = initWeb3(opts.chain);
    // const contract = opts.contract.toLowerCase();
    const contracts = ["0x831753dd7087cac61ab5644b308642cc1c33dc13","0x903060acd58a5742ebf863fa58855e310397a853","0xc004e2318722ea2b15499d6375905d75ee5390b8","0x4438da4ef8e791a9964d27742676e6a70beb2514","0x723b17718289a91af252d616de2c77944962d122","0xd2A2a353D28e4833FAFfC882f6649c9c884a7D8f","0x72b9f88e822cf08b031c2206612b025a82fb303c","0xc17b109E146934D36c33E55FADE9cBDa791b0366","0x229b1b6C23ff8953D663C4cBB519717e323a0a84","0x23E8B6A3f6891254988B84Da3738D2bfe5E703b9","0x2F25d402829cA4085B8Ea4D3BC68Bf203F5a9faB","0x228b5C21ac00155cf62c57bcc704c0dA8187950b","0xA9536B9c75A9E0faE3B56a96AC8EdF76AbC91978","0xC155504787e9430180F33F35eDd7C5eC06Cd5761","0x311434160D7537be358930def317AfB606C0D737","0x2bC07124D8dAc638E290f401046Ad584546BC47b","0x3B56a704C01D650147ADE2b8cEE594066b3F9421","0x60E6895184448f3e8EF509D083e3cC3AC31F82Fd","0x91c5A5488c0dEcde1Eacd8a4F10e0942fb925067","0xcDa6c923458cA9faC8e3354999e866FeAa80B72f","0xEcc4176B90613Ed78185f01bd1E42C5640C4F09d","0xe26cda27c13f4f87cFFc2F437C5900b27eBb5bbB","0x9dBfc1cbf7a1E711503a29B4b5F9130ebeCcaC96","0x613a489785C95afEB3b404CC41565cCff107B6E0","0x61f95bd637e3034133335C1baA0148E518D438ad","0x0d0B8488222F7f83B23E365320a4021b12eAD608","0x981AeCC6EB4d382b96A02B75E931900705e95A31","0x02003538587cf58FbcC06f15043F2618d4F56B55","0xdd9bA3B2571BEA0854beb0508CE10FeD0eCa7e3e","0xd9E838dd60c8ea1e7dD4E670913323bB87DB112c","0x74ba6A10978F643A84C0b37fCB599081079811cB","0x614Af88dAc8bbFfC5a167BB79Ff3F5e0769F1A3F","0x559f80C6f05322067455DeF52114109150F5F19C","0xB0D11cBf626D6a97A1A4E54000e6Daa2214128B5","0xEcfb24Be40f88D66Bb7A14a4bc7f22bDF6841a93","0x346404079b3792a6c548B072B9C4DDdFb92948d5","0xf0f9D895aCa5c8678f706FB8216fa22957685A13","0xc6C855AD634dCDAd23e64DA71Ba85b8C51E5aD7c","0x08Ce2D030CDD9B4661933504Cf4DadE5679a76Ec",]
    // const c = await isContract(contract);
    // if (!c) {
    //     spinner.fail(`不是合约地址: ${contract}`)
    //     process.exit()
// }

    for (const c of contracts) {
        await tokenInfo(c);
    }

    spinner.succeed(`成功.`);
})()

async function isContract(to) {
    const code = await web3.eth.getCode(to);
    return (code.length > 2);
}

export async function tokenInfo(contract) {
    // name 
    // const name = await web3Call(contract, encodeNameCall())
    // spinner.info(`name:    ${web3.utils.hexToUtf8(name)}`)

    // // symbol
    const symbol = await web3Call(contract, encodeSymbolCall())
    // spinner.info(`symbol:  ${web3.utils.hexToUtf8(symbol)}`)

    // decimals
    const result = await web3Call(contract, encodeDecimalsCall())
    const decimals = web3.utils.hexToNumber(result);
    // spinner.info(`decimals: ${decimals}`)
    if(decimals < 8) {
        console.log(`contract: ${contract}, name: ${web3.utils.hexToUtf8(symbol)}, decimal ${decimals}`);
    }

    // totalSupply
    // const total = await web3Call(contract, encodeTotalSupplyCall())
    // spinner.info(`totalSupply: ${web3.utils.toBN(total).div(new web3.utils.toBN(10 ** decimals)).toString()}`)
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

 