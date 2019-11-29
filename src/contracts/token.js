import { transaction } from '../funcs/blockchain';

// CONTRACT REFERENCES
function refs(state) {
   return {
      manager: state.managers.token.methods,
      address: state.managers.token._address
   }
}

// INITIALIZE
function init(token_price, task_manager, state) {
   const { manager, address } = refs(state);

   return transaction({
      query: manager.init(token_price, task_manager),
      contract: address
   }, state)
}

// TOKEN/USER BALANCE OVERVIEW
async function overview(state) {
   const { manager } = refs(state);

   return {
      price: await manager.token_price().call(),
      balance: await manager.user_balance(state.keys.public).call()
   }
}

// BUY TOKEN
async function buy_token(amount, state) {
   const { manager, address } = refs(state);

   // FETCH THE TOKEN PRICE
   const price = await manager.token_price().call()

   return transaction({
      query: manager.buy_token(amount),
      contract: address,
      payable: amount * price
   }, state)
}

// TRANSFER TOKENS
function transfer_token(amount, recipient, state) {
   const { manager, address } = refs(state);

   return transaction({
      query: manager.transfer_token(amount, recipient),
      contract: address
   }, state)
}

export {
   init,
   overview,
   buy_token,
   transfer_token
}