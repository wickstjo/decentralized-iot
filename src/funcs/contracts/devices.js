// FETCH USERDATA
function fetch({ contracts }, id) {
   return contracts.devices.methods.fetch(id).call();
}

// ADD USER
function add({ contracts, metamask }, id, name) {
   return contracts.devices.methods.remove(id, name).send({
      from: metamask.user
   });
}

// REMOVE USER
function remove({ contracts, metamask }, id) {
   return contracts.devices.methods.remove(id).send({
      from: metamask.user
   });
}

export {
   fetch,
   add,
   remove
}