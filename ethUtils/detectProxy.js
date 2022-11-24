// 检测目标合约是否满足指定协议（ERC20、ERC721、ERC1155）
/**
 * https://stackoverflow.com/questions/45364197/how-to-detect-if-an-ethereum-address-is-an-erc20-token-contract?rq=1
 * https://bscscan.com/address/0xaFb64E73dEf6fAa8B6Ef9a6fb7312d5C4C15ebDB#code
 *
 * 示例:
 nvm use v14.17.0 && node ethUtils/detectFee.js \
 --chain=eth
  */

import spinners from "cli-spinners";
import {program} from 'commander';
import ora from "ora";
import {initWeb3} from "./initWeb3.js";

const spinner = ora("检测代理合约...")
spinner.spinner = spinners.arrow3

program
    .option('-c, --chain <type>', 'choose chains. bsc eth polygon')

const argvs = program.parse(process.argv);

let web3

const contracts = ["0x831753dd7087cac61ab5644b308642cc1c33dc13","0x903060acd58a5742ebf863fa58855e310397a853","0xc004e2318722ea2b15499d6375905d75ee5390b8","0x4438da4ef8e791a9964d27742676e6a70beb2514","0x723b17718289a91af252d616de2c77944962d122","0xd2A2a353D28e4833FAFfC882f6649c9c884a7D8f","0x72b9f88e822cf08b031c2206612b025a82fb303c","0xc17b109E146934D36c33E55FADE9cBDa791b0366","0x229b1b6C23ff8953D663C4cBB519717e323a0a84","0x23E8B6A3f6891254988B84Da3738D2bfe5E703b9","0x2F25d402829cA4085B8Ea4D3BC68Bf203F5a9faB","0x228b5C21ac00155cf62c57bcc704c0dA8187950b","0xA9536B9c75A9E0faE3B56a96AC8EdF76AbC91978","0xC155504787e9430180F33F35eDd7C5eC06Cd5761","0x311434160D7537be358930def317AfB606C0D737","0x2bC07124D8dAc638E290f401046Ad584546BC47b","0x3B56a704C01D650147ADE2b8cEE594066b3F9421","0x60E6895184448f3e8EF509D083e3cC3AC31F82Fd","0x91c5A5488c0dEcde1Eacd8a4F10e0942fb925067","0xcDa6c923458cA9faC8e3354999e866FeAa80B72f","0xEcc4176B90613Ed78185f01bd1E42C5640C4F09d","0xe26cda27c13f4f87cFFc2F437C5900b27eBb5bbB","0x9dBfc1cbf7a1E711503a29B4b5F9130ebeCcaC96","0x613a489785C95afEB3b404CC41565cCff107B6E0","0x61f95bd637e3034133335C1baA0148E518D438ad","0x0d0B8488222F7f83B23E365320a4021b12eAD608","0x981AeCC6EB4d382b96A02B75E931900705e95A31","0x02003538587cf58FbcC06f15043F2618d4F56B55","0xdd9bA3B2571BEA0854beb0508CE10FeD0eCa7e3e","0xd9E838dd60c8ea1e7dD4E670913323bB87DB112c","0x74ba6A10978F643A84C0b37fCB599081079811cB","0x614Af88dAc8bbFfC5a167BB79Ff3F5e0769F1A3F","0x559f80C6f05322067455DeF52114109150F5F19C","0xB0D11cBf626D6a97A1A4E54000e6Daa2214128B5","0xEcfb24Be40f88D66Bb7A14a4bc7f22bDF6841a93","0x346404079b3792a6c548B072B9C4DDdFb92948d5","0xf0f9D895aCa5c8678f706FB8216fa22957685A13","0xc6C855AD634dCDAd23e64DA71Ba85b8C51E5aD7c","0x08Ce2D030CDD9B4661933504Cf4DadE5679a76Ec","0xD4945a3D0De9923035521687D4bf18cC9B0c7c2A","0x44d09156c7b4ACf0C64459Fbcced7613F5519918","0x5DFD5edFde4d8EC9e632dCA9d09Fc7E833f74210","0x5eC03C1f7fA7FF05EC476d19e34A22eDDb48ACdc","0x9b765735C82BB00085e9DBF194F20E3Fa754258E","0x8C069b6cEf3453bAbb15fA97784AFFeB95d398Fa","0x94788309D420ad9f9f16d79fC13Ab74de83f85F7","0xD07f5314533B592D4E7cA19F204E4C2098cbeD8e","0x999E2e604f48De45480F97B5037A70Aa2a78B488","0xFB32513135e3267995268E3099d2B6114d20B6eD","0x79375C41d88F839f551457145066096C5C8944Bc","0x0c9b3aB1bd0CF0745625381F5C3Aa1CD9BBc7Abb","0x990a524EBc0A54fd2A7ebC02A1CE54D309fb5CD3","0x8303396EA8b5419E187950Ce609ea1F610289912","0x7e7737C40878e720b32e7bC9CD096259f876d69f","0x8c9bAC920CD9CF8c61F7fA4f34f43C572d040F61","0x431CD3C9AC9Fc73644BF68bF5691f4B83F9E104f","0xA0E5c8b2B2e345C72f452880b2c164b944012907","0x94C56C35C97b6278557b07e3A23Ef6a884D6FE02"];

const w = [];

(async () => {
    spinner.start();
    const opts = argvs.opts();
    web3 = initWeb3(opts.chain);
    for (let index = 0; index < contracts.length; index++) {
        const c = contracts[index];
        // 是否合约地址
        const code = await contractCode(c);
        if (code.lenght <= 2) {
            spinner.fail(`不是合约地址: ${c}`)
            process.exit()
        }
    
        // symbol
        const symbol = await web3Call(c, encodeSymbolCall())
        // spinner.info(`symbol:  ${web3.utils.hexToUtf8(symbol)}`)
    
        const data = await getStorageAt(c);
        
        const num = web3.utils.toBN(data)
        if(num == 0) {
            continue
        }
        const address = '0x' + web3.utils.encodePacked(data).substring(26)
        spinner.info(`${index} 代理合约  ${c}, ${web3.utils.hexToUtf8(symbol)}, ${address}`)
    }
    spinner.succeed(`检查完成...`)
})()

function encodeSymbolCall() {
    return web3.eth.abi.encodeFunctionSignature('symbol()')
}

async function contractCode(to) {
    return await web3.eth.getCode(to);
}

async function getStorageAt(contract) {
    return await web3.eth.getStorageAt(contract, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc", "latest").catch(err => {
        spinner.fail(`获取data错误: ${err.toString()}`)
        process.exit();
    })
}

async function web3Call(contract, data) {
    return await web3.eth.call({
        to: contract,
        data: data
    }, "latest").catch(err => {
        spinner.fail(`获取data错误: ${err.toString()}`)
        process.exit();
    })
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