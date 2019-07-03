// FETCH USER
function fetch({ contracts, web3 }, user) {
   return contracts.users.methods.fetch(user).call().then(response => {
      return {
         name: response.name,
         reputation: web3.utils.hexToNumber(response.reputation),
         joined: web3.utils.hexToNumber(response.joined),
         isset: response.isset
      }
   })
}

// ADD USER
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id21
function add({ contracts, user }, name) {
   return contracts.users.methods.add(name).send({
      from: user,
      gas: 500000
   })
}

// REMOVE USER
function remove({ contracts, user }) {
   return contracts.users.methods.remove().send({
      from: user
   });
}

function actions({ contracts }) {
   return contracts.users.events.Action().on('data', event => {

      // DECONSTRUCT RESPONSE & LOG MESSAGE
      const { source, sender } = event.returnValues;
      console.log(sender + ' has ' + source + ' an account');
   })
}

export {
   fetch,
   add,
   remove,
   actions
}