# ETH/BSC/POLYGON 等主链

## 功能列表
- [ ] estimateGasLimit
- [ ] EIPs detect
- [ ] ERC20 Token Info
- [ ] ERC721 Token Info
- [ ] recommender gasPrice 


### estimateGasLimit
1. BSC 示例 
```sh
node ethUtils/estimateGas.js --chain bsc --contract 0x81d5791E65e0dB42687e2cAF205F14A5E550C2aF --from 0x1cbea3a5a7ddd157dec94a6248efd719518d1f9c --to 0x328130164d0f2b9d7a52edc73b3632e713ff0e16 --amount 666666666
```

2. ETH 示例 
```sh
node ethUtils/estimateGas.js --chain eth --contract 0x81d5791E65e0dB42687e2cAF205F14A5E550C2aF --from 0x1cbea3a5a7ddd157dec94a6248efd719518d1f9c --to 0x328130164d0f2b9d7a52edc73b3632e713ff0e16 --amount 666666666
```

### EIPs Detect
实现以太坊系列主流协议ERC20/ERC721/ERC1155检测  

提现异常事故