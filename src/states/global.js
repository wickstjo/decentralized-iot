import { keys } from '../resources/settings';

// DEFAULT VALUES
const values = {
   
   // USER KEYS
   keys: {
      public: keys.public,
      private: keys.private
   },

   // APP TOOLS
   web3: undefined,
   contracts: undefined,
   interfaces: undefined,

   // PROMPT & MESSAGES
   prompt: {
      show: false,
      content: null
   },
   messages: []
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {

      // SET TOOLS
      case 'tools': { return {
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