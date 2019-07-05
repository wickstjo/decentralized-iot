import Web3 from 'web3';
import { connection, keys } from '../resources/settings.json';
import references from '../resources/latest.json';

// INITIALIZE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   let web3 = new Web3(connection.type + '://' + connection.host + ':' + connection.port);

   // RETURN REFERENCES
   return {
      web3: web3,
      contracts: {
         devices: contract(web3, 'devices'),
         licences: contract(web3, 'licences'),
         tasks: contract(web3, 'tasks'),
         users: contract(web3, 'users')
      }
   }
}

// FETCH CORRECT CONTRACT
function contract(web3, name) {
   return new web3.eth.Contract(
      references[name].abi,
      references[name].address
   );
}

// SIGN SC TRANSACTION
function transaction({ query, contract }, { web3 }) {

   // TRANSACTION OUTLINE
   const tx = {
      from: keys.public,
      to: contract,
      gas: 500000,
      data: query.encodeABI()
   }

   // SIGN IT & EXECUTE
   return web3.eth.accounts.signTransaction(tx, keys.private).then(signed => {
      return web3.eth.sendSignedTransaction(signed.rawTransaction).then(() => {
         return true;
      }).catch(error => {
         console.log(error.toString())
         return false;
      })
   })
}

// CALL SC METHOD
function call({ query, callback }) {
   return query.call().then(response => {
      return {
         success: true,
         data: callback(response)
      }
   }).catch(error => {
      console.log(error.toString())
      return { success: false };
   })
}

// LISTEN TO SC EVENT
function event({ contracts }) {
   return contracts.users.events.Action().on('data', event => {

      // DECONSTRUCT RESPONSE & LOG MESSAGE
      const { source, sender } = event.returnValues;

      // LOG EVENT
      console.log(sender + ' has ' + source + ' an account');
   })
}

// ESTIMATE GAS OST
function gas() {
   return 500000;
}

export {
   init,
   transaction,
   call,
   event,
   gas
}