const symbol_sdk_1 = require('symbol-sdk');
/* start block 01 */
// replace with node endpoint
const nodeUrl = 'http://ik1-432-48199.vs.sakura.ne.jp:3000';
const repositoryFactory = new symbol_sdk_1.RepositoryFactoryHttp(nodeUrl);
const blockHttp = repositoryFactory.createBlockRepository();
const height = 1;
blockHttp.getBlockByHeight(symbol_sdk_1.UInt64.fromUint(height)).subscribe(
  (block) => console.log('block: ', block),
  (err) => console.error(err),
);