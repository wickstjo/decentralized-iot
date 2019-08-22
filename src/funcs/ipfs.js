// FETCH HASH CONTENT
function fetch(hash, state) {
   return state.ipfs.cat(hash).then(response => {
      return {
         success: true,
         data: response
      }
   }).catch(error => {
      return {
         reason: error
      }
   })
}

export {
   fetch
}