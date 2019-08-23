# Decentralized IOT
This is a decentralized platform where **Ethereum** (blockchain) users can post and accept customized tasks which are automatically completed by an assigned **IOT device**. Users and devices both need to be registered in their respective **Smart Contracts** before actions can be performed, and posting tasks requires a **virtual token**. Task results are **encrypted with PGP** before being pushed to an **IPFS swarm**, which results in a Qm-hash the buyer can use to fetch the data. After a task has been completed, the smart contract is dissolved and the funds are awarded to the appropriate user.

This is the frontend application for the project while the [rpi-handler](https://github.com/wickstjo/rpi-handler) repository contains the CLI based application that runs on the IOT device. The same queries and actions can be performed via either, because the Ethereum blockchain is the only required backend component.

## Table of Contents
* [Requirements](https://github.com/wickstjo/decentralized-iot#requirements)
* [How to Install](https://github.com/wickstjo/decentralized-iot#how-to-install)
* [Custom Scripts](https://github.com/wickstjo/decentralized-iot#custom-scripts)
* [Points of Interest](https://github.com/wickstjo/decentralized-iot#points-of-interest)

## Requirements
* GO IPFS v0.4.21
* Ganache CLI v6.4.3
* Truffle v5.0.18
* NodeJS v10.16.1
* NPM v6.11.2

## How to Install
```bash
git clone https://github.com/wickstjo/decentralized-iot
cd decentralized-iot
npm install
npm start
```

## Custom Scripts
* **Start local blockchain**:
> npm run ganache
  
* **Start IPFS daemon:**
> npm run ipfs

* **Deploy & overwrite Smart Contracts:**
> npm run truffle

## Point of Interest
* **Change gateway/account settings**:
> root/src/resources/settings.json

* Smart Contracts:
> root/contracts/