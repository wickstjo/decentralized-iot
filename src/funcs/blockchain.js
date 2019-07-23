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
         token: contract(web3, 'token'),
         tasks: contract(web3, 'tasks'),
         users: contract(web3, 'users')
      },
      interface: {
         device: references['device'].abi,
         task: references['task'].abi
      }
   }
}

// FETCH CORRECT CONTRACT
function contract(web3, name) {
   return new web3.eth.Contract(
      references[name].abi,
      references[name].address
   )
}

// SIGN SC TRANSACTION
function transaction({ query, contract, payable }, state) {

   // ESTIMATE GAS PRICE
   return query.estimateGas({}).then(price => {

      // TRANSACTION OUTLINE
      const tx = {
         from: keys.public,
         to: contract,
         gas: price,
         data: query.encodeABI()
      }

      // IF PAYABLE WAS DEFINED, ADD VALUE PROP TO TRANSACTION
      if (payable !== undefined) {
         tx.value = payable;
      }

      // SIGN IT & EXECUTE
      return state.web3.eth.accounts.signTransaction(tx, keys.private).then(signed => {
         return state.web3.eth.sendSignedTransaction(signed.rawTransaction).then(() => {
            return true;

         // IF THE TRANSACTION FAILS
         }).catch(error => {
            console.log(error.toString())
            return false;
         })
      })

   // IF THE GAS ESTIMATION FAILS
   }).catch(error => {
      console.log(error.toString())
      return { success: false };
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

// ASSEMBLE SINGLE CONTRACT REFERENCE
function assemble({ address, contract }, state) {
   return new state.web3.eth.Contract(
      state.interface[contract],
      address
   )
}

// ESTIMATE GAS
function esimate_gas(query, callback) {
   return query.estimateGas({}).then(response => {
      return {
         success: true,
         data: callback(response)
      }
   }).catch(error => {
      console.log(error.toString())
      return { success: false };
   })
}

export {
   init,
   transaction,
   call,
   event,
   assemble,
   esimate_gas
}