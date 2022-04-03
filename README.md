# Solidity Sandbox

My personal sandbox for learning how to write, test and deploy Solidity smart contracts

-Connor Phillips

## Directory
- **/contracts** - Storage of Solidity smart contracts based on ERC
    - ERC20
    - ERC721 
    - ERC1155
- **/frontend** - Next.js frontend framework. Also includes the storage of ABI files
   - src/artifacts = ABI file location
- **/scripts** - Scripts interacting with the Ethereum blockchain. Smart contract deployment, transactions, etc.
    - /local - Local environment interactions. Hardhat network
    - /rinkeby - Rinkeby environment interactions
- **/test** - Smart contract tests
- **/token-meta** - Assets and meta-information used in smart contracts