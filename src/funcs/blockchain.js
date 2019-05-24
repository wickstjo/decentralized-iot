import Web3 from 'web3';
import { networks, abi } from '../compiled/Main.json';

// DOCS
// https://web3js.readthedocs.io/en/1.0/web3-eth.html

// INITIALIZE SC & WEB3
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

// FETCH ALL AVAILABLE USERS
function accounts({ web3 }) {
    return web3.eth.getAccounts().then(accounts => {
        return new Set(accounts);

   // ON FAILURE, RETURN NULL
   }).catch(() => { return null; });
}

// FETCH SMART CONTRACT MASTER
function master({ contract }) {
   return contract.master().then(response => {
      return response;

   // ON FAILURE, RETURN NULL
   }).catch(() => { return null; });
}

// ADD USER
function add({ contract, name, permission, address }) {
   return contract.add(name, permission, address).then(response => {
      return response;

   // ON FAILURE, RETURN NULL
   }).catch(() => { return null; });
}

// FETCH USER DETAILS
function details({ contract, user }) {
   return contract.users(user).then(response => {
      return response;

   // ON FAILURE, RETURN NULL
   }).catch(() => { return null; });
}

// MODIFY USER DETAILS
function modify({ contract, address, permission }) {
   return contract.modify(address, permission).then(response => {
      return response;

   // ON FAILURE, RETURN NULL
   }).catch(() => { return null; });
}

export {
    init,
    accounts,
    details,
    master,
    add,
    modify
}