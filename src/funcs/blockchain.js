import Web3 from 'web3';
import { connection } from '../resources/settings.json';
import references from '../resources/latest.json';

// INITIALIZE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(Web3.givenProvider || 'http://' + connection.host + ':' + connection.port, null, {});

   // RETURN REFERENCES
   return {
      web3: web3,
      proxy: web3.givenProvider,
      host: web3._currentProvider.host,
      contracts: {
         devices: contract(web3, 'devices'),
         licences: contract(web3, 'licences'),
         tasks: contract(web3, 'tasks'),
         token: contract(web3, 'token'),
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

// FETCH DEVICES
function fetch_devices({ contracts }) {
   return contracts.devices.methods.fetch('foo').call();
}

export {
   init,
   fetch_devices
}

// // DEPLOYED SMART CONTRACT NETWORK
// const network = 'DEV';

// // CHECK USER NETWORK BEFORE EXECUTING FUNC
// const check = (callback) => {
//    if (state.metamask.network === network) {
//       callback();

//    // IF IT DOESNT MATCH, LOG ERROR
//    } else { console.log('wrong network') }
// }