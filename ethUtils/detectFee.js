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

const spinner = ora("检测通缩合约...")
spinner.spinner = spinners.arrow3

program
    .option('-c, --chain <type>', 'choose chains. bsc eth polygon')

const argvs = program.parse(process.argv);

let web3

const contracts = [];

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
    
        const encodeIsExcludedFromFee = web3.eth.abi.encodeFunctionSignature("isExcludedFromFee(address)");
        if (code.indexOf(encodeIsExcludedFromFee.substr(2)) > 0) {
            let data = isExcludedFromFee('0x3aB28eCeDEa6cdb6feeD398E93Ae8c7b316B1182');
            const result = await web3Call(c, data)
            let isExcludeFee = web3.utils.hexToNumber(result);
            if (isExcludeFee !== 1) {
                spinner.info(`未添加白名单  ${c} ${web3.utils.hexToUtf8(symbol)}`)
            }
            continue
        }

        // excludeFromFees(address,bool)  / totalFees / uniswapV2Pair
        // if (code.indexOf('c0246668') > 0 ||
        //     code.indexOf('9d8f7706') > 0 ||
        //     code.indexOf('13114a9d') > 0 ||
        //     code.indexOf('49bd5a5e') > 0) {
        //     spinner.info(`✅ 符合通缩合约 excludeFromFees, ${c} ${web3.utils.hexToUtf8(symbol)}`)
        // }
    }
})()

function isExcludedFromFees(address) {
    return web3.eth.abi.encodeFunctionCall({
        name: 'isExcludedFromFees',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'to'
        }]
    }, [address]);
}

function isExcludedFromFee(address) {
    return web3.eth.abi.encodeFunctionCall({
        name: 'isExcludedFromFee',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'to'
        }]
    }, [address]);
}

function encodeSymbolCall() {
    return web3.eth.abi.encodeFunctionSignature('symbol()')
}

async function contractCode(to) {
    return await web3.eth.getCode(to);
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