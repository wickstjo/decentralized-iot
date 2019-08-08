import Web3 from 'web3';
import { gateways, keys } from '../resources/settings.json';
import references from '../resources/latest.json';

// INITIALIZE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   const web3 = new Web3('ws://' + gateways.blockchain.host + ':' + gateways.blockchain.port);

   // RETURN REFERENCES
   return {
      web3: web3,
      contracts: contracts([
         'devices',
         'token',
         'tasks',
         'users'
      ], web3),
      interfaces: interfaces([
         'device',
         'task'
      ])
   }
}

// CONSTRUCT SMART CONTRACT REFERENCE
function contracts(names, web3) {
    
   // RESPONSE PLACEHOLDER
   const response = {};

   // LOOP THROUGH & COMBINE EACH ABI & ADDRESS
   names.forEach(name => {
      response[name] = new web3.eth.Contract(
         references[name].abi,
         references[name].address
      )
   })

   return response;
}

// FETCH SINGLE CONTRACT INTERFACE
function interfaces(names) {

   // RESPONSE PLACEHOLDER
   const response = {}

   // LOOP THROUGH & ATTACH ABI
   names.forEach(name => {
      response[name] = references[name].abi
   })

   return response;
}

// SIGN SC TRANSACTION
function transaction({ query, contract, payable }, state) {

   // TRANSACTION OUTLINE
   const tx = {
      from: keys.public,
      to: contract,
      data: query.encodeABI()
   }

   // IF PAYABLE WAS DEFINED, ADD VALUE PROP TO TRANSACTION
   if (payable !== undefined) {
      tx.value = payable;
   }

   // ESTIMATE GAS PRICE
   return query.estimateGas(tx).then(price => {

      // ADD GAS PROPERTY TO TRANSACTION
      tx.gas = price;

      // SIGN IT & EXECUTE
      return state.web3.eth.accounts.signTransaction(tx, keys.private).then(signed => {
         return state.web3.eth.sendSignedTransaction(signed.rawTransaction).then(() => {
            return {
               success: true
            }

         // IF THE TRANSACTION FAILS
         }).catch(error => {
            return {
               reason: prune(error)
            }
         })
      })

   // IF THE GAS ESTIMATION FAILS
   }).catch(error => {
      return {
         reason: prune(error)
      }
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
      return {
         reason: prune(error)
      }
   })
}

// PRUNE ERROR MESSAGE
function prune(error) {

   // CONVERT TO STRING & NUKE GARBAGE
   error = error.toString();
   error = error.replace('Error: Returned error: VM Exception while processing transaction: revert ', '');

   return error;
}

// ASSEMBLE SINGLE CONTRACT REFERENCE
function assemble({ address, contract }, state) {
   return new state.web3.eth.Contract(
      state.interface[contract],
      address
   )
}

// ASSESS METHOD RESPONSE
function assess({ msg, func }, result, dispatch) {
   switch(result.success) {

      // ON SUCCESS
      case true:

         // IF A FUNCTION WAS PROVIDED, EXECUTE IT
         if (func !== undefined) {
            func(result.data)
         }

         dispatch({
            type: 'add-message',
            payload: {
               text: msg,
               type: 'good'
            }
         })
      break;

      // ON ERROR
      default: {
         dispatch({
            type: 'add-message',
            payload: {
               text: result.reason,
               type: 'bad'
            }
         })
      }
   }
}

export {
   init,
   transaction,
   call,
   assemble,
   assess,
   prune
}