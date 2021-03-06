import Web3 from 'web3';
import { gateways } from '../resources/settings.json';
import references from '../resources/latest.json';

// PARSE SC & WEB3
function init() {

   // ESTABLISH WEB3 CONNECTION
   const web3 = new Web3('ws://' + gateways.blockchain.host + ':' + gateways.blockchain.port);

   // RESOLVE WITH REFERENCES
   return {
      web3: web3,
      managers: managers([
         'user',
         'device',
         'task',
         'token'
      ], web3),
      interfaces: interfaces([
         'user',
         'device',
         'task'
      ])
   }
}

// CONSTRUCT SMART CONTRACT REFERENCE
function managers(names, web3) {
    
   // RESPONSE PLACEHOLDER
   const response = {};

   // LOOP THROUGH & COMBINE EACH ABI & ADDRESS
   names.forEach(name => {
      response[name] = new web3.eth.Contract(
         references[name + 'manager'].abi,
         references[name + 'manager'].address
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
      from: state.keys.public,
      to: contract,
      data: query.encodeABI()
   }

   // IF PAYABLE WAS DEFINED, ADD VALUE PROP TO TRANSACTION -- ROUND UP
   if (payable !== undefined) {
      tx.value = Math.ceil(payable);
   }

   // ESTIMATE GAS PRICE
   return query.estimateGas(tx).then(price => {
      console.log(price)

      // ADD GAS PROPERTY TO TRANSACTION
      tx.gas = price;

      // SIGN IT & EXECUTE
      return state.web3.eth.accounts.signTransaction(tx, state.keys.private).then(signed => {
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
function call({ query, modify }) {
   return query.call().then(response => {
      switch(modify) {

         // UNMODIFIED
         case undefined: { return {
            success: true,
            data: response
         }}

         // MODIFIED
         default: { return {
            success: true,
            data: modify(response)
         }}
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
      state.interfaces[contract],
      address
   )
}

// ASSESS METHOD RESPONSE
function assess({ msg, next }, result, dispatch) {
   switch(result.success) {

      // ON SUCCESS
      case true:

         // IF PROVIDED, SEND MESSAGE
         if (msg !== undefined) {
            dispatch({
               type: 'add-message',
               payload: {
                  text: msg,
                  type: 'good'
               }
            })
         }

         // IF PROVIDED, EXECUTE FOLLOW-UP FUNCTION
         if (next !== undefined) {
            next(result.data)
         }
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

// CHECK IF STRING IS AN ADDRESS
function is_address(string, state) {
   return state.web3.utils.isAddress(string);
}

export {
   init,
   transaction,
   call,
   assemble,
   assess,
   prune,
   is_address
}