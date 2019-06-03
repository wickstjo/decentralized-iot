import Web3 from 'web3';
import { connection, latest, contracts } from '../settings.json';

// INITIALIZE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(Web3.givenProvider || 'http://' + connection.host + ':' + connection.port, null, {});

   // RETURN REFERENCES
   return {
      contract: web3.eth.Contract(latest.abi, latest.address),
      web3: web3,
      proxy: web3.givenProvider,
      host: web3._currentProvider.host
   }
}

// CROSS CONTRACT CALL
function temp({ contract }) {
   return contract.methods.foobar(contracts.users).call();
}

export {
   init,
   temp
}