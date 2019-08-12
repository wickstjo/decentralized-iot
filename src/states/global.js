// DEFAULT VALUES
const values = {
   web3: undefined,
   contracts: undefined,
   interfaces: undefined,
   prompt: {
      show: false,
      content: null
   },
   messages: []
}

// FUNCTION TYPES
function reducer(state, { type, payload }) {
   switch (type) {

      // CONNECT WITH BLOCKCHAIN GATEWAY
      case 'connect': { return {
         ...state,
         web3: payload.web3,
         contracts: payload.contracts,
         interfaces: payload.interfaces
      }}

      // CLOSE PROMPT
      case 'close-prompt': { return {
         ...state,
         prompt: {
            ...state.prompt,
            show: false
         }
      }}

      // ADD MESSAGE
      case 'add-message': { return {
         ...state,
         messages: [
            ...state.messages,
            payload
         ]
      }}

      // FALLBACK
      default: {
         return state;
      }
   }
}

export {
   values,
   reducer
}