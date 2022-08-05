const {TokenListProvider} = require("@solana/spl-token-registry");
const program = require('commander')

program
    .option('-c, --contract <type>', 'contract address')
 
const re = program.parse(process.argv);

(async () => {
    const opts = re.opts();
    console.log(`查询合约地址：\n${opts.contract}\n`)

    const tokens = await new TokenListProvider().resolve();
    const mainTokenList = tokens.filterByClusterSlug('mainnet-beta').getList();
    // const testTokenList = tokens.filterByChainId(102).getList();

    mainTokenList.forEach(token => {
        if(token.address == opts.contract) {
            console.log(`查询Token信息: \n${JSON.stringify(token, null, 2)}`)
        }
    });
})()


/**
 * 示例
 * nvm use v10.15.3 && node solana/tokenQuery.js -c PRiME7gDoiG1vGr95a3CRMv9xHY7UGjd4JKvfSkmQu2
 */