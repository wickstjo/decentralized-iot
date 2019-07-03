import Web3 from 'web3';
import { connection } from '../resources/settings.json';
import references from '../resources/latest.json';

// INITIALIZE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(connection.type + '://' + connection.host + ':' + connection.port);

   // RETURN REFERENCES
   return {
      web3: web3,
      proxy: web3.givenProvider,
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

// FIND REASON TO CONTRACT
function reason(error) {

   // STRINGIFY ERROR
   const stringify = error.toString()

   // FIND START & END INDEX
   const start = stringify.search('reason":"') + 9;
   const end = stringify.search('"},"stack":"')

   // RETURN REASON
   return stringify.substring(start, end);
}

export {
   init,
   reason
}