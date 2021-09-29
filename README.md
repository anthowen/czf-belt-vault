# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat help
```

## Contracts

### CzfBeltVault

#### Address
- testnet

  `0x76D8b248e5389Cf85DDA4A4807FB2f4B63140BA7`

- mainnet

  `TBD`


## Scripts

### compile

```shell
npm run compile
```

### deploy

```shell
npm run deploy:testnet
```


### verify

```shell
npx hardhat verify --network testnet DEPLOYED_CONTRACT_ADDRESS
```

[Reference](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

