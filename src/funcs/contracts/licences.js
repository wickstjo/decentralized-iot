// FETCH PRICE
function price({ contracts, web3 }) {
   return contracts.licences.methods.price().call().then(response => {
      return web3.utils.hexToNumber(response);
   });
}

// FETCH DURATION
function duration({ contracts, web3 }) {
   return contracts.licences.methods.duration().call().then(response => {
      return web3.utils.hexToNumber(response);
   });
}

// FETCH USERDATA
function fetch({ contracts, web3 }, user) {
   return contracts.licences.methods.fetch(user).call().then(response => {
      return web3.utils.hexToNumber(response);
   });
}

// ADD USER
function add({ contracts, metamask, web3 }, amount) {
   return price({ contracts, web3 }).then(price => {
      return contracts.licences.methods.add(amount).send({
         from: metamask.user,
         value: amount * price
      });
   })
}

// REMOVE USER
function remove({ contracts, metamask }) {
   return contracts.licences.methods.remove().send({
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