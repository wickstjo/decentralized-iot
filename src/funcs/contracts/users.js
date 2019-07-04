import { transaction } from '../blockchain';

// FETCH USER
function fetch({ contracts, web3 }, user) {
   return contracts.users.methods.fetch(user).call().then(response => {
      return {
         name: response.name,
         reputation: web3.utils.hexToNumber(response.reputation),
         joined: web3.utils.hexToNumber(response.joined),
         isset: response.isset
      }
   }).catch(error => {
      return error.toString();
   })
}

// ADD USER
function add({ contracts, user, web3 }, name) {
   return transaction({
      web3: web3,
      query: contracts.users.methods.add(name),
      contract: contracts.users._address,
      from: user
   }).then(() => {
      return 'user added successfully';
   }).catch(error => {
      return error.toString();
   })
}

// REMOVE USER
function remove({ contracts, user, web3 }) {
   return transaction({
      web3: web3,
      query: contracts.users.methods.remove(),
      contract: contracts.users._address,
      from: user
   }).then(() => {
      return 'user removed successfully';
   }).catch(error => {
      return error.toString();
   })
}

function listen({ contracts }) {
   return contracts.users.events.Action().on('data', event => {

      // DECONSTRUCT RESPONSE & LOG MESSAGE
      const { source, sender } = event.returnValues;

      // LOG EVENT
      console.log(sender + ' has ' + source + ' an account');
   })
}

export {
   fetch,
   add,
   remove,
   listen
}