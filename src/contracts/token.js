import { transaction, call } from '../funcs/blockchain';

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
      query: state.contracts.token.methods.fetch()
   })
}

// CHECK BALANCE
function check(user, state) {
   return call({
      query: state.contracts.token.methods.check(user)
   })
}

// BUY LICENCE
function buy(amount, state) {
   return price(state).then(result => {
      switch(result.success) {

         // ON SUCCESS
         case true: {
            return transaction({
                  query: state.contracts.token.methods.add(amount),
                  contract: state.contracts.token._address,
                  payable: amount * result.data
            }, state)
         }

         // ON ERROR
         default: { return {
            reason: result.reason
         }}
      }
   })
}

// REMOVE LICENCE
function transfer(amount, recipient, state) {
   return transaction({
      query: state.contracts.token.methods.transfer(amount, recipient),
      contract: state.contracts.token._address,
   }, state)
}

// TOKEN AMOUNT CHANGED EVENT
function event(state) {
   return state.contracts.token.events.Update();
}

export {
   init,
   price,
   check,
   buy,
   transfer,
   event
}