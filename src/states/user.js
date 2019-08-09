// DEFAULT VALUES
const values = {
   found: null,
   user: {},
   collection: []
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {
       
      // SET USER DATA
      case 'user': { return {
         ...state,
         user: action.payload
      }}

      // SET COLLECTION DATA
      case 'collection': { return {
         ...state,
         found: true,
         collection: action.payload
      }}

      // USER NOT FOUND
      case 'failure': { return {
         ...state,
         found: false
      }}

      default: {
         return state;
      }
   }
}

export {
   values,
   reducer
}