import Web3 from 'web3';
import { networks, abi } from '../contracts/Main.json';

// INITIALIZE SC & WEB3
function init({ host, blockchain }) {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(Web3.givenProvider || 'http://' + host + ':' + blockchain, null, {});

   // FETCH SMART CONTRACT ADDRESS
   const name = Object.keys(networks).pop();
   const address = networks[name].address;

   // RETURN REFERENCES
   return {
      contract: web3.eth.Contract(abi, address),
      web3: web3,
      proxy: web3.givenProvider,
      host: web3._currentProvider.host
   }
}

// ADD PERSON
function add(state, value) {
   return state.contract.methods.add(value).send({
      from: state.metamask.user
   });
}

// FETCH PERSON
function person(contract, id) {
   return contract.methods.person(id).call();
}

// FETCH EVERYONE
function everyone({ contract }) {
   return contract.methods.everyone.call();
}

export {
   init,
   add,
   everyone,
   person
}