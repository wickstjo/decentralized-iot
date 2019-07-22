import { transaction, call } from './blockchain';
import { keys } from '../resources/settings.json';

// INITIALIZE TOKEN CONTRACT
function init(price, tasks, state) {
   return transaction({
      query: state.contracts.token.methods.init(price, tasks),
      contract: state.contracts.token._address,
   }, state)
}

// CHECK LICENCE STATUS
function price(state) {
   return call({
      query: state.contracts.token.methods.price(),
      callback: (response) => {
         return response;
      }
   })
}

// CHECK LICENCE STATUS
function check(state) {
   return call({
      query: state.contracts.token.methods.check(keys.public),
      callback: (response) => {
         return response;
      }
   })
}

// BUY LICENCE
function buy(amount, state) {
   return price(state).then(({ success, data }) => {
      if (success) {
         return transaction({
               query: state.contracts.token.methods.add(amount),
               contract: state.contracts.token._address,
               payable: amount * data
         }, state)
      }
   })
}

// REMOVE LICENCE
function transfer(amount, user, state) {
   return transaction({
      query: state.contracts.token.methods.transfer(amount, user),
      contract: state.contracts.token._address,
   }, state)
}

export {
   init,
   price,
   check,
   buy,
   transfer
}