// 估算指定主链，
/**
 * 示例：
 nvm use v14.17.0 && node ethUtils/estimateGas.js \
 --chain bsc \
 --contract 0xE6664F3C20d503beAf78B5B4B059a388fbE9B75f \
 --from 0x328130164d0F2B9D7a52edC73b3632e713ff0ec6 \
 --to 0x8A9393E755A447B2fFD4551DF0ED0940365BAE1d \
 --amount 1
 */

import ora from "ora";
import spinners from "cli-spinners";
import {initWeb3} from "./initWeb3.js";
import pkg from 'decimal.js';

const {Decimal} = pkg;


const spinner = ora("处理中...")
spinner.spinner = spinners.arrow3

let web3


const addresses = [
    "0x3ab28ecedea6cdb6feed398e93ae8c7b316b1182",
    "0xf08e264144989ccfdce48e00ea0221bd44adf14c",
    "0x041258c44cab4dd1a366a91356973eb475164a5e",
    "0x05b5639f1c70cc30202b21f899edca27a530d37a",
    "0x09f1f2ee3c2979653116eecdb9986b52549ce68b",
    "0x0af6f0c336250f4995de7e226b9b0ea624f97c86",
    "0x0e3d2156c8bce5c2024965f39c479d3e7155a809",
    "0x0e93c21296c3b191ad623522767d79b25a955370",
    "0x117ad680d8b98b2399d7f094352612bfde6bd1b3",
    "0x1202bb5e546ce6f25da138c584a390cd7e4c7e21",
    "0x141ab208e203d54c992d9c7bb6dc875405abbf7b",
    "0x14e4c704ce7a47fb8b5933855965c4b4d6f8c92a",
    "0x184edb5a2cc7600b420ac10bdd8083bc57d753e0",
    "0x185506812243d347ecace16d6ec8a46ef3ef0162",
    "0x1d6ce1df76a1a1bb039e966d1f3b18546e21796e",
    "0x221ca214b339202c0222504875bf57503ee043c8",
    "0x242cbeb759524567877557a576278eb7719e547a",
    "0x26d8adcbf10c92720d1ae346712513b5464ac1c7",
    "0x27567d56c7e469b159956c9abfe772a6441cd746",
    "0x279360636deb83933375cd34686b749af6ef5700",
    "0x28d9bcc7e8014a009dacc13e73d46900da3323b2",
    "0x28e96e5512f2829237d3958d2642350e97bf3e8c",
    "0x294d98a3852732f4d1acac245f114bc74c5c725b",
    "0x2a272a03214269031fb15a828f0b142b87527a28",
    "0x2ac7751f34fd4f942e96520febd24302b3d09039",
    "0x2c2bbb2934d2e2c52dbe443798ba09a712d5faa4",
    "0x3042c7d31df5cbeedd23ac52744d37bf6910013b",
    "0x384d3cbae41e884ee2d60c4d82e029a8259a3ca9",
    "0x39aa7a4b539f128d5cd1730504620f90dfe4c5da",
    "0x3b30c3ec818f817c62cab73dd66b981492cf2ab3",
    "0x3d34d8754a2ff23da529c8ac74aed79f14919e0b",
    "0x3e8399efb961a50669a974641a29d4e1bd529303",
    "0x3ea3c27c294e3cbc14452eae2cb0ece79c66d21e",
    "0x3efd0468e00324d363b4b559da540405a2fe988c",
    "0x425ca90c33f72016f7b3f2b951ecc77cdf3a01a0",
    "0x469bdb9f2e4c97d066c5c3686184e816eaacbaed",
    "0x4a8c0fe841408c891b3e2f310e493dd960cf4cde",
    "0x4abe0103f6dca2eadc2e2478c5ac7e08aa307393",
    "0x4b19775c3a8267aa4ba9dd56f90b1f0e79d729c0",
    "0x4bd47fe2d2762834fbba5c079cc2a094119d7149",
    "0x4d6f87eae7d62928da54d2229570c40893b16df3",
    "0x4d968c5c63de610ddf9a98422e2193aeb4986767",
    "0x4f8d37aafbdf4bd1d45c945f0f9eff7286720c35",
    "0x501bced9b16d476f6ef300b7f0bd50953609f4ec",
    "0x50dd224da300b51d65c82cd5c200c2a60f9418e3",
    "0x54c042a5d97d73b630a0ab8865ff120d1fc201d9",
    "0x55ce3a385a61f4af4a025f1f9ef854376a3cdba5",
    "0x5e01fa45db0dc86eef5a744262ec6097bc0a16c6",
    "0x60ed9d1a0fbdf2484e637de170868c0d43554fe7",
    "0x6196d9e503cb8a5a4404973f3cbc184cd145bdca",
    "0x6441a712b87484751affb3dc4132a6402435cb99",
    "0x6a6f56f2e2db2eb9055e716861bd771c33916332",
    "0x6d524157138dbe0f079df75697bf1edf9468e5d3",
    "0x7a38aa887be377fdd47fb66123d927677fd421ce",
    "0x7a659d9470759803fb86bfe6358520fb6890a52e",
    "0x7cadafecb1eaf56a86ce16134b147d35f73184b0",
    "0x833f9aebccb9c86690775ad33d401cf7b2059970",
    "0x83e4a55b471cabe47f8b1652e03608a74b94d252",
    "0x87d97adb345a116e10ac7b53136fe7a937a26157",
    "0x886845f508a2e70f17b0e8e796a4c52b24bff68f",
    "0x8b279e170fa64e7db2a0bb497f8d824cf119f852",
    "0x8bab38a436349f6b44b8086d658b4fb64acd5423",
    "0x8db59ccd45bff83ca4f5f0c363e56c0977b34468",
    "0x8f77998eca3dad5ccd3f8df36c9ae5d7d551ff08",
    "0x956e1fe621436a3ded71964d56503818325b1634",
    "0x969fa8d57545343bca8be3eec9a6c63a6f5d004f",
    "0x9705018b43eff3ff95f188746f16e6767c8d4c63",
    "0x97c0d9c25a0ce14c8fd55ea56bb28f56992e8517",
    "0x9856cf4924c8a12a274f443b9133c5c85bddf33a",
    "0x9aa0a0dfb91852ce7ee9aa4158a9618694da3e37",
    "0x9f16534b8db0fb6b63fd5b385367ce82a6a6979a",
    "0x9f24d1666f44e3e4685d114d153d412ad2577636",
    "0xa0fdb99d152c973001a256693eb2bae4fe612ac7",
    "0xa19cd8133216eaf1e499fb2ae52d4c1f2bc13b63",
    "0xa1d23d19009e2eafee3690d6ca1304a23bc3c18c",
    "0xa2c825b923cd580d66a53d729a390efdbc3844a0",
    "0xa3d59698d1e4f21e701bf8f85bd1d53792f235b1",
    "0xa3fab33cea92b047ee1dadb92dd03a72f6b462a8",
    "0xa440c5421c379843b379e219be8578cd347b4420",
    "0xa733125391b5816cb2062b153557ea963d5ea7b2",
    "0xa82732f91bf32e81420ce71551207cd30dc39e6e",
    "0xac9cd15ec1163c8c75982029b948b6c68952834e",
    "0xad5ec0b087509da50157081b17b16b6fa2737b8d",
    "0xb01933e692644992e01ddc31fb4391c4b44ce01a",
    "0xb0551963c36c2b967673cf019a892913c4b13c83",
    "0xb5359b4dbfdeaea4c16f3822170c31d393f00ecc",
    "0xb6a479d4fe54459f55d6f1884b593ff6cad27116",
    "0xb7f1a98357a11c9b591ee5fa9402a78efba488cb",
    "0xb878cd9406de015873750a97101a776d1379cdba",
    "0xb9436292ec50b0081b6c304f83851f16143ad1db",
    "0xbe5b352831bbdac411199444a2f3d55bcd699b33",
    "0xbeb5c12a44105b5eadfa433b9b6d16070824a8a7",
    "0xc73befe7148260c18455089bc9adf71fb50ca66e",
    "0xc897211455ad60da9b7785d5a1e05a37b33041f4",
    "0xc95dba17290c0252baf53e694716e0c6e9da9719",
    "0xc9e4741974040f4c083229a5ec70bbf14ef3a6ea",
    "0xca78e364effdec17ad78b2fd10bf60f02f9cd4ca",
    "0xcae59e5bcd367a62eb7ed16066ea8c1c79ace976",
    "0xd4381a5b15ab6f413193753ea0a973fee9e94a00",
    "0xd7cfe367b053aafef21a9cf0a9762ce676cd123f",
    "0xda020d7f726e5ad081006ddb9e44df91c18a4f80",
    "0xdba0956b93c5b250732c4c2333dca9669578bd73",
    "0xdc43d79c57d3388068abcafd64d2df941b2d722b",
    "0xdc7f4a4eaed8da922b1648a9806012ccf0c095ee",
    "0xdd3125aa59e153b7cf0ccce43e7ac0dad7defce3",
    "0xddbae4d5693b0d757336552e0a42ff58d1010623",
    "0xdfcc74e87cf049d4f8e9ad981a34a705a328a2a5",
    "0xe1b1743a27d76c6eb6bc4e22a61b580fd7b96794",
    "0xe3d59a271bb7ff19f8a814680ea05222434193d9",
    "0xe4e1ac7b81917b81347f7636cb584ef8ae5cc1c2",
    "0xef0289198eb33bde30d4b9a094d60ddd88f8a321",
    "0xf3e7da2c8bdeb71eb97b606ece379a2a4a82585b",
    "0xf659f7c32477d70013dbb31ebbc1ef607dc5e30b",
    "0xf6d2e8fb2b8ab134551ca2e9914b6834a3e73932",
    "0xfa39c3f745ea119266c01d7af2b3462d75728db5",
    "0xfd59b96718c280b17fa4dd3ea7e2f451d20139e0",
    "0xff5b4795ba38710c208828440b450212781eb466"
];

(async () => {
    spinner.start("\n开始获取余额...\n");

    web3 = initWeb3("eth");

    let sum = new Decimal("0");
    for (let i = 0; i < addresses.length; i++) {
        const result = await web3.eth.call({
            to: "0x4cfF49d0A19ed6Ff845a9122fa912AbcFB1F68A6",
            data: encodeBalanceOfCall(addresses[i])
        }, "latest").catch(err => {
            spinner.fail(`获取balance错误: \n${err.toString()}`)
            process.exit();
        })
        const balance = web3.utils.hexToNumberString(result);
        const BN = web3.utils.BN;
        const amount = new BN(balance);
        const d = web3.utils.toBN(10 ** 18);
        const d1 = new Decimal(d.toString());
        const d2 = new Decimal(amount.toString());


        const chainAmount = d2.div(d1)
        sum = sum.add(chainAmount)
        spinner.info(`adddress: ${addresses[i]}, amount: ${chainAmount}`);
    }
    spinner.succeed(`sum: ${sum}`);
})();

function encodeBalanceOfCall(address) {
    return web3.eth.abi.encodeFunctionCall({
        name: "balanceOf",
        type: "function",
        inputs: [{
            type: "address",
            name: ""
        }]
    }, [address]);
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
