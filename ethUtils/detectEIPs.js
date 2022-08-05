// 检测目标合约是否满足指定协议（ERC20、ERC721、ERC1155）
/**
 * https://stackoverflow.com/questions/45364197/how-to-detect-if-an-ethereum-address-is-an-erc20-token-contract?rq=1
 * https://eips.ethereum.org/EIPS/eip-165#simple-summary
 * https://eips.ethereum.org/EIPS/eip-1155#erc-1155-token-receiver
 * https://eips.ethereum.org/EIPS/eip-721#abstract
 * https://eips.ethereum.org/EIPS/eip-20
 * 示例: 
nvm use v14.17.0 && node ethUtils/detectEIPs.js \
--chain=eth \
--contract=0x565AbC3FEaa3bC3820B83620f4BbF16B5c4D47a3 \
--eips=721
 */

import spinners from "cli-spinners";
import { program } from 'commander';
import ora from "ora";
import { initWeb3 } from "./initWeb3.js";

const spinner = ora("检测EIPs...")
spinner.spinner = spinners.arrow3

program
    .option('-c, --chain <type>', 'choose chains. bsc eth polygon')
    .option('-C, --contract <type>', 'contract address')
    .option('-e --eips <type>', 'eips: erc20 erc721 erc1155')

const argvs = program.parse(process.argv);

let web3

(async () => {
    spinner.start();
    const opts = argvs.opts();
    web3 = initWeb3(opts.chain);
    const contract = opts.contract.toLowerCase();
    // 是否合约地址
    const code = await contractCode(contract);
    if (code.lenght <= 2) {
        spinner.fail(`不是合约地址: ${contract}`)
        process.exit()
    }

    // await detectERC165(contract);

    // safeBatchTransferFrom TransferBatch
    if (code.indexOf('2eb2c2d6') > 0 && code.indexOf('4a39dc06') > 0) {
        spinner.info('✅符合ERC1155\n')
    }
    
    // decimals/ name/ symbol/ totalSupply/ transfer
    if (code.indexOf('313ce567') > 0 && code.indexOf('18160ddd') > 0 && code.indexOf('a9059cbb') > 0) {
        spinner.info('✅符合ERC20\n')
    }



    // ownerOf safeTransferFrom 
    if (code.indexOf('6352211e') > 0 || code.indexOf('b88d4fde') > 0) {
        spinner.info('✅符合ERC721')
    }

    // const eips = opts.eips;
    // if (eips == '1155') {
    //     // await detectERC1155(contract)
    //     // safeBatchTransferFrom TransferBatch
    //     if (code.indexOf('2eb2c2d6') > 0 && code.indexOf('4a39dc06') > 0) {
    //         spinner.succeed('符合ERC1155')
    //     } else {
    //         spinner.fail('不符合ERC1155')
    //     }
    // } else if (eips == '721') {
    //     // await detectERC721(contract);
    //     // ownerOf safeTransferFrom 
    //     if (code.indexOf('6352211e') > 0 || code.indexOf('b88d4fde') > 0) {
    //         spinner.succeed('符合ERC721')
    //     } else {
    //         spinner.fail('不符合-ERC721')
    //     }
    // } else if (eips == '20') {
    //     // await detectERC20(contract)
    //     // decimals/ name/ symbol/ totalSupply/ transfer
    //     if (code.indexOf('313ce567') > 0 && code.indexOf('18160ddd') > 0 && code.indexOf('a9059cbb') > 0) {
    //         spinner.succeed('符合ERC20')
    //     } else {
    //         spinner.fail('不符合-ERC20')
    //     }
    // } else {
    //     spinner.fail(`不支持查询EIPs. ${eips}`)
    //     process.exit();
    // }
    // spinner.succeed(`成功.`);
})()

async function contractCode(to) {
    return await web3.eth.getCode(to);
}

async function detectERC20(contract) {

}

// function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external returns(bytes4);
//    function tokenByIndex(uint256 _index) external view returns (uint256);
//     function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);
async function detectERC721(contract) {
    /**
    balanceOf:         0x70a08231
    name():            0x06fdde03
    symbol():          0x95d89b41
    ownerOf():         0x6352211e
    approve():         0x095ea7b3
    getApproved:       0x081812fc
    setApprovalForAll: 0xa22cb465
    isApprovedForAll:  0xe985e9c5
    getApproved:       0x081812fc
    transferFrom:      0x23b872dd
    safeTransferFrom:  0x42842e0e
    safeTransferFrom2: 0xb88d4fde
    onERC721Received:  0x150b7a02
     */
    // const encodeData = web3.eth.abi.encodeFunctionCall({
    //     name: 'tokenByIndex',
    //     type: 'function',
    //     inputs: [{
    //         type: 'uint256',
    //         name: 'index'
    //     }]
    // }, [0]);

    // spinner.info(encodeData);
    // const res = await web3Call(contract, encodeData);
    // spinner.info(res);
}

//function balanceOf(address _owner, uint256 _id) external view returns (uint256);
//function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);
//function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _value, bytes calldata _data) external returns(bytes4);
async function detectERC1155(contract) {
    const encodeData = web3.eth.abi.encodeFunctionCall({
        name: 'supportsInterface',
        type: 'function',
        inputs: [{
            type: 'bytes4',
            name: 'interfaceID'
        }]
    }, ['0x01ffc9a7']);

    spinner.info(encodeData);
    const res = await web3Call(contract, encodeData);
    spinner.info(res);
}

async function detectERC165(contract) {
    spinner.info(`Detect ERC165...`);
    const encodeData = web3.eth.abi.encodeFunctionCall({
        name: 'supportsInterface',
        type: 'function',
        inputs: [{
            type: 'bytes4',
            name: 'interfaceID'
        }]
    }, ['0x01ffc9a7']);
    const res = await web3Call(contract, encodeData);
    spinner.info(`ERC165: ${res}`);
}

async function web3Call(contract, data) {
    return await web3.eth.call({
        to: contract,
        data: data
    }).catch(err => {
        spinner.fail(`获取data错误: \n${err.toString()}`)
        // process.exit();
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