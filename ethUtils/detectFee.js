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

const contracts = ["0x23E8B6A3f6891254988B84Da3738D2bfe5E703b9",];

const w = [];

const whiteContracts = [];
const whetherWhites = []
const whiteLessContractas= [];

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
        // excludeFromFees(address,bool)  / totalFees / uniswapV2Pair
        if (code.indexOf('c0246668') > 0 ||
            code.indexOf('9d8f7706') > 0 ||
            code.indexOf('13114a9d') > 0 ||
            code.indexOf('49bd5a5e') > 0) {

            const funcs =  ["isExcludedFromFee(address)", "isExcludedFromFees(address)", "isExcluded(address)"];
            const funcName =  ["isExcludedFromFee", "isExcludedFromFees", "isExcluded"];
            let isMatch = false;
            const whiteAddress = "0x5c7beD3Cca42e4562877eD88B9Aa0F5898Ed59B0"
            let index = 0;
            for (; index < funcs.length; index++) {
                const func = funcs[index];
                const funcSig = web3.eth.abi.encodeFunctionSignature(func);
                if(code.indexOf(funcSig.substring(2)) > 0) {
                    isMatch = true;
                    const funcCallData = isWhiteAddress(funcName[index], whiteAddress);
                    const result = await web3Call(c, funcCallData);
                    const isWhite = web3.utils.hexToNumber(result);

                    if(isWhite) {
                        // 白名单
                        spinner.info(`✅符合通缩合约 +    白名单.  ${c},            ${func}`)
                        whiteContracts.push(c)
                    }  else {
                        // 未匹配到白名单
                        spinner.info(`✅符合通缩合约+未添加白名单.  ${c},           ${func}`)
                        whiteLessContractas.push(c)
                    }
                }
            }

            if(!isMatch) {
                // 未匹配到目标白名单方法， 无法确定是否白名单
                        spinner.info(`✅符合通缩合约&无法判断白名单. ${c},          unkown`)  
                whetherWhites.push(c)
            }
        }
        
    }

    console.log(`通缩合约&无白名单 ${JSON.stringify(whiteLessContractas)}`)

    console.log(`通缩合约&白名单 ${JSON.stringify(whiteContracts)}`)

    console.log(`通缩合约&不确定白名单 ${JSON.stringify(whetherWhites)}`)
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

function isExcluded(address) {
    return web3.eth.abi.encodeFunctionCall({
        name: 'isExcluded',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'to'
        }]
    }, [address]);
}

function isWhiteAddress(methods, address) {
    return web3.eth.abi.encodeFunctionCall({
        name: methods,
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
        // spinner.fail(`获取data错误: ${err.toString()}`)
        // process.exit();
        return 0;
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