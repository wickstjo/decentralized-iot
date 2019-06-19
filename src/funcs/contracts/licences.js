// FETCH PRICE
function price({ contracts }) {
   return contracts.licences.methods.price().call();
}

// FETCH DURATION
function duration({ contracts }) {
   return contracts.licences.methods.duration().call();
}

// FETCH USERDATA
function fetch({ contracts }, user) {
   return contracts.licences.methods.fetch(user).call();
}

// ADD USER
function add({ contracts, metamask }, name) {
   return contracts.licences.methods.add(name).send({
      from: metamask.user
   });
}

// REMOVE USER
function remove({ contracts, metamask }) {
   return contracts.licences.methods.remove(metamask.user).send({
      from: metamask.user
   });
}

export {
   price,
   duration,
   fetch,
   add,
   remove
}