// DEFAULT VALUES
const values = {
   history: [],
   open: []
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {

      // SET USER TASKS
      case 'history': { return {
         ...state,
         history: action.payload
      }}

      // SET ALL TASKS
      case 'open': { return {
         ...state,
         open: action.payload
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