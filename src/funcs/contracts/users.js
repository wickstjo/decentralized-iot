// FETCH USER
function fetch({ contracts, web3 }, user) {
   return contracts.users.methods.fetch(user).call().then(response => {
      return {
         name: response.name,
         reputation: web3.utils.hexToNumber(response.reputation),
         joined: web3.utils.hexToNumber(response.joined),
         isset: response.isset
      }
   });
}

// ADD USER
function add({ contracts, metamask }, name) {
   return contracts.users.methods.add(name).send({
      from: metamask.user
   });
}

// REMOVE USER
function remove({ contracts, metamask }) {
   return contracts.users.methods.remove().send({
      from: metamask.user
   });
}

export {
   fetch,
   add,
   remove
}