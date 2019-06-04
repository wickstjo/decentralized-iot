import Web3 from 'web3';
import { connection } from '../resources/settings.json';
import { abi, main, users } from '../resources/latest.json';

// INITIALIZE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(Web3.givenProvider || 'http://' + connection.host + ':' + connection.port, null, {});

   // RETURN REFERENCES
   return {
      contract: web3.eth.Contract(abi, main),
      web3: web3,
      proxy: web3.givenProvider,
      host: web3._currentProvider.host
   }
}

// CROSS CONTRACT CALL
function temp({ contract }) {
   return contract.methods.foobar(users).call();
}

export {
   init,
   temp
}