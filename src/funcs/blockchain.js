import Web3 from 'web3';
import { networks, abi } from '../compiled/Main.json'

// DOCS
// https://web3js.readthedocs.io/en/1.0/web3-eth.html

function init({ host, blockchain }) {

    // PLACEHOLDER
    let web3 = null;

    // ESTABLISH WEB3 CONNECTION
    if (typeof Web3 === undefined) {
        web3 = new Web3(Web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://' + host + ':' + blockchain));
    }

    // FISH OUT THE SC ADDRESS
    const address = Object.keys(networks).pop().address;

    // RETURN SC & WEB3 REFERENCES
    return {
        contract: web3.eth.Contract(abi, address),
        web3: web3
    }
}

function accounts({ web3 }) {
    return web3.eth.getAccounts().then(accounts => {
        return new Set(accounts);
    });
}

export {
    init,
    accounts
}