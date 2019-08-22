// DEFAULT VALUES
const values = {
   details: {},
   results: [],
   found: false
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {

      // SET DETAILS
      case 'details': { return {
         ...state,
         details: action.payload
      }}

      // SET RESULTS
      case 'results': { return {
         ...state,
         results: action.payload,
         found: true
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