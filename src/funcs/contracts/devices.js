// FETCH DEVICE DATA
function fetch({ contracts }, id) {
   return contracts.devices.methods.fetch(id).call();
}

// ADD DEVICE
function add({ contracts, metamask }, id, name) {
   return contracts.devices.methods.add(id, name).send({
      from: metamask.user
   });
}

// REMOVE DEVICE
function remove({ contracts, metamask }, id) {
   return contracts.devices.methods.remove(id).send({
      from: metamask.user
   });
}

// FETCH DEVICE STATUS
function status({ contracts }, id) {
   return contracts.devices.methods.status(id).call();
}

// FETCH DEVICE STATUS
function toggle({ contracts, metamask }, id) {
   return contracts.devices.methods.toggle(id).send({
      from: metamask.user
   });
}

export {
   fetch,
   add,
   remove,
   status,
   toggle
}