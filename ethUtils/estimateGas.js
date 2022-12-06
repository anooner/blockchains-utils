// 估算指定主链，
/**
 * 示例：
nvm use v14.17.0 && node ethUtils/estimateGas.js \
--chain bsc \
--contract 0x55d398326f99059fF775485246999027B3197955 \
--from 0x7563758243A262E96880F178aeE7817DcF47Ab0f \
--to 0x29bD57D591Ad823f98d3cd73Da938a56aB4945E4 \
--amount 312
 */

import { program } from 'commander';
import ora from "ora";
import spinners from "cli-spinners";
import { initWeb3 } from "./initWeb3.js";

const spinner = ora("处理中...")
spinner.spinner = spinners.arrow3

program
    .option('-c, --chain <type>', 'choose chains')
    .option('-C, --contract <type>', 'contract address')
    .option('-from, --from <type>', 'from address')
    .option('-to, --to <type>', 'to address')
    .option('-a, --amount <type>', 'transfer value', '1');

const argvs = program.parse(process.argv);

let web3

(async () => {
    spinner.start("\n开始估算GasLimit...");
    const opts = argvs.opts();

    web3 = initWeb3(opts.chain);

    const c = await isContract(opts.contract);
    if(!c) {
        spinner.fail(`不是合约地址: ${opts.contract}`)
        process.exit()
    }

    const result = await web3.eth.call({
        to: opts.contract,
        data: encodeDecimalsCall()
    }).catch(err => {
        spinner.fail(`获取decimal错误: \n${err.toString()}`)
        process.exit();
    })
    const decimals = web3.utils.hexToNumber(result);
    spinner.info(`decimals: ${decimals}`)
    
    const BN = web3.utils.BN;
    const amount = new BN(opts.amount);
    const d = web3.utils.toBN(10 ** decimals);
    const chainAmount = amount.mul(d).toString();
    spinner.info(`chain amount: ${chainAmount}`);

    const callData = encodeTransferCall(chainAmount, opts.to);
    // spinner.info(`data: ${callData}`)
    const res = await web3.eth.estimateGas({
        from: opts.from,
        to: opts.contract,
        data: callData
    }).catch(err => {
        spinner.fail(`估算错误: \n${err.toString()}`)
        process.exit();
    })
    spinner.succeed(`估算gasLimit: ${res}`);
})()

async function isContract(to) {
    const code = await web3.eth.getCode(to);
    return (code.length > 2);
}

function encodeTransferCall(amount, address) {
    const transferCode = web3.eth.abi.encodeFunctionCall({
        name: 'transfer',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'to'
        }, {
            type: 'uint256',
            name: 'amount'
        }]
    }, [address, amount]);

    return transferCode;
}

function encodeDecimalsCall() {
    // return web3.eth.abi.encodeFunctionCall({
    //     name: 'decimals',
    //     type: 'function',
    //     inputs: []
    // });
    return web3.eth.abi.encodeFunctionSignature('decimals()')
}


function encodeTransferParas(amount, address) {
    const pamount = web3.eth.abi.encodeParameter('uint256', amount);
    const paddress = web3.eth.abi.encodeParameter('bytes32', address);

    return { amount: pamount, address: paddress };
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
