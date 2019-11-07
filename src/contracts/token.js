import { transaction, call } from '../funcs/blockchain';

// INITIALIZE TOKEN CONTRACT
function init(token_price, task_manager, state) {
   return transaction({
      query: state.managers.token.methods.init(token_price, task_manager),
      contract: state.managers.token._address,
   }, state)
}

// CHECK LICENCE STATUS
function price(state) {
   return call({
      query: state.contracts.token.methods.price()
   })
}

// CHECK BALANCE
function balance(user, state) {
   return call({
      query: state.contracts.token.methods.balance(user)
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

// DEVICE ADDED EVENT
function event({ name, action }, state) {

   // STATUS CHANGED EVENT
   const event = state.contracts.token.events[name]();

   // SUBSCRIBE
   event.on('data', event => {
      action(event.returnValues)
   })

   return event;
}

export {
   init,
   price,
   balance,
   buy,
   transfer,
   event
}