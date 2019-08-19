import { keys } from '../resources/settings';

// DEFAULT VALUES
const values = {
   web3: undefined,
   contracts: undefined,
   interfaces: undefined,
   prompt: {
      show: false,
      content: null
   },
   messages: [],
   keys: {
      public: keys.public,
      private: keys.private
   },
   devices: [],
   tasks: []
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {

      // CONNECT WITH BLOCKCHAIN GATEWAY
      case 'init': { return {
         ...state,
         ...action.payload
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