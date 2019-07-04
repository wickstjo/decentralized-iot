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
   return new web3.eth.Contract(
      references[type].abi,
      references[type].address
   );
}

// SIGN DATA TRANSACTION
function transaction({ web3, query, contract, from }) {

   // USER PRIVATE KEY
   const private_key = '0x6dced18d9efdad6ca1eed9dc13d4f768c0b6af28696f045f74d245c5682ac41f';

   // TRANSACTION OUTLINE
   const tx = {
      from: from,
      to: contract,
      gas: 500000,
      data: query.encodeABI()
   }

   // SIGN IT & EXECUTE
   return web3.eth.accounts.signTransaction(tx, private_key).then(signed => {
      return web3.eth.sendSignedTransaction(signed.rawTransaction);
   });
}

// ESTIMATE GAS OST
function gas() {
   return 500000;
}

export {
   init,
   transaction,
   gas
}