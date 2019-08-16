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
function reducer(state, action) {
   switch (action.type) {

      // CONNECT WITH BLOCKCHAIN GATEWAY
      case 'connect': { return {
         ...state,
         web3: action.payload.web3,
         contracts: action.payload.contracts,
         interfaces: action.payload.interfaces
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
            action.payload
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