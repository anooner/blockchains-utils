
import { initWeb3 } from "./initWeb3.js";

let web3

(async () => {
    web3 = initWeb3('eth');

    console.log(`########### ERC20 Interfaces ###########`)
    console.log(`decimals():     ${encodeFuncSig('decimals()')}`)
    console.log(`name():         ${encodeFuncSig('name()')}`)
    console.log(`symbol():       ${encodeFuncSig('symbol()')}`)
    console.log(`totalSupply():  ${encodeFuncSig('totalSupply()')}`)
    console.log(`balanceOf():    ${encodeFuncSig('balanceOf(address)')}`)
    console.log(`transfer():     ${encodeFuncSig('transfer(address,uint256)')}`)
    console.log(`transferFrom(): ${encodeFuncSig('transferFrom(address,address,uint256)')}`)
    console.log(`Event Transfer: ${encodeFuncSig('Transfer(address,address,uint256)')}`)

    console.log(`\n########### ERC721 Interfaces ###########`)
    console.log(`balanceOf:         ${encodeFuncSig('balanceOf(address)')}`)
    console.log(`name():            ${encodeFuncSig('name()')}`)
    console.log(`symbol():          ${encodeFuncSig('symbol()')}`)
    console.log(`ownerOf():         ${encodeFuncSig('ownerOf(uint256)')}`)
    console.log(`approve():         ${encodeFuncSig('approve(address,uint256)')}`)
    console.log(`getApproved:       ${encodeFuncSig('getApproved(uint256)')}`)
    console.log(`setApprovalForAll: ${encodeFuncSig('setApprovalForAll(address,bool)')}`)
    console.log(`isApprovedForAll:  ${encodeFuncSig('isApprovedForAll(address,address)')}`)
    console.log(`getApproved:       ${encodeFuncSig('getApproved(uint256)')}`)
    console.log(`transferFrom:      ${encodeFuncSig('transferFrom(address,address,uint256)')}`)
    console.log(`safeTransferFrom:  ${encodeFuncSig('safeTransferFrom(address,address,uint256)')}`)
    console.log(`safeTransferFrom2: ${encodeFuncSig('safeTransferFrom(address,address,uint256,bytes)')}`)
    console.log(`onERC721Received:  ${encodeFuncSig('onERC721Received(address,address,uint256,bytes)')}`)

    console.log(`\n########### ERC1155 Interfaces ###########`)
    console.log(`safeBatchTransferFrom:         ${encodeFuncSig('safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)')}`)
    console.log(`safeBatchTransferFrom:         ${encodeFuncSig('TransferBatch(address,address,address,uint256[],uint256[])')}`)

    // 	function excludeFromFees(address account, bool excluded) external onlyOwner {
    console.log(`excludeFromFees:         ${encodeFuncSig('excludeFromFees(address,bool)')}`)
    
    // Swap(address,uint,uint,uint,uint,address)
    console.log(`ExcludeFromFees:         ${encodeFuncSig('ExcludeFromFees(address,bool)')}`)

    // totalFees
    console.log(`totalFees:         ${encodeFuncSig('totalFees()')}`)

    // uniswapV2Pair
    console.log(`uniswapV2Pair:         ${encodeFuncSig('uniswapV2Pair()')}`)
})()

// encodeFunctionSignature
function encodeFuncSig(data) {
    return web3.eth.abi.encodeFunctionSignature(data);
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
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
} 
*/

/** 
 * ERC721 
 *  * 0x80ac58cd ===
 *   bytes4(keccak256('balanceOf(address)')) 
 *   bytes4(keccak256('ownerOf(uint256)')) 
 *   bytes4(keccak256('approve(address,uint256)')) 
 *   bytes4(keccak256('getApproved(uint256)')) 
 *   bytes4(keccak256('setApprovalForAll(address,bool)')) 
 *   bytes4(keccak256('isApprovedForAll(address,address)')) 
 *   bytes4(keccak256('transferFrom(address,address,uint256)')) 
 *   bytes4(keccak256('safeTransferFrom(address,address,uint256)')) 
 *   bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)'))
 * 
 * Metadata
 *  name()
 *  symbol()
 *  tokenURI(uin256 _tokenId)
 */

/**
 * ERC1155 Interfaces
 *  event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);
    event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    event URI(string _value, uint256 indexed _id);
    
    function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external;
    function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external;
    function balanceOf(address _owner, uint256 _id) external view returns (uint256);
    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory);
    function setApprovalForAll(address _operator, bool _approved) external;
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
 */

/**
 ########### ERC20 Interfaces ###########
decimals():     0x313ce567
name():         0x06fdde03
symbol():       0x95d89b41
totalSupply():  0x18160ddd
balanceOf():    0x70a08231
transfer():     0xa9059cbb
transferFrom(): 0x23b872dd
Event Transfer: 0xddf252ad

########### ERC721 Interfaces ###########
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

/**
 interface IERC1155 {
    event TransferSingle(
        address indexed _operator,
        address indexed _from,
        address indexed _to,
        uint256 _id,
        uint256 _value
    );
    event TransferBatch(
        address indexed _operator,
        address indexed _from,
        address indexed _to,
        uint256[] _ids,
        uint256[] _values
    );
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    event URI(string _value, uint256 indexed _id);

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external;

    function safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] calldata _ids,
        uint256[] calldata _values,
        bytes calldata _data
    ) external;

    function balanceOf(address _owner, uint256 _id) external view returns (uint256);

    function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids)
        external
        view
        returns (uint256[] memory);

    function setApprovalForAll(address _operator, bool _approved) external;

    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}
 */
