import Web3 from 'web3';
import { connection } from '../resources/settings.json';
import references from '../resources/latest.json';

// INITIALIZE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(Web3.givenProvider || connection.type + '://' + connection.host + ':' + connection.port);

   // RETURN REFERENCES
   return {
      web3: web3,
      proxy: web3.givenProvider,
      host: web3._currentProvider.host,
      contracts: {
         devices: contract(web3, 'devices'),
         licences: contract(web3, 'licences'),
         tasks: contract(web3, 'tasks'),
         users: contract(web3, 'users')
      }
   }
}

// FETCH CORRECT CONTRACT
function contract(web3, type) {
   return web3.eth.Contract(
      references[type].abi,
      references[type].address
   );
}

export {
   init
}