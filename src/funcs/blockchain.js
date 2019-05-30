import Web3 from 'web3';
import { networks, abi } from '../contracts/Main.json';

// INITIALIZE SC & WEB3
function init({ host, blockchain }) {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(Web3.givenProvider || 'http://' + host + ':' + blockchain, null, {});

   // FETCH SMART CONTRACT ADDRESS
   const name = Object.keys(networks).pop();
   const address = networks[name].address;

   // RETURN WEB3 & SMART CONTRACT REFERENCES
   return {
      contract: web3.eth.Contract(abi, address),
      web3: web3,
      proxy: web3.givenProvider,
      host: web3._currentProvider.host
   }
}

// FETCH ALL AVAILABLE USERS
function accounts ({ web3 }) {
   return web3.eth.getAccounts();
}

// FETCH SMART CONTRACT MASTER
function my_func ({ contract }) {
   return contract.methods.getMessage.call();
}

// FETCH SMART CONTRACT MASTER
function my_var ({ contract }) {
   return contract.methods.foobar.call();
}

export {
   init,
   accounts,
   my_func,
   my_var,
}