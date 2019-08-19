// DEFAULT VALUES
const values = {
   found: false,
   location: '',
   details: {}
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {

      // SET PRICE
      case 'location': { return {
         ...state,
         location: action.payload
      }}

      // SET BALANCE
      case 'details': { return {
         ...state,
         details: action.payload,
         found: true
      }}

      case 'toggle': { return {
         ...state,
         details: {
            ...state.details,
            status: action.payload
         }
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