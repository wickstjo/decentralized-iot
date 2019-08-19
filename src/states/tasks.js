// DEFAULT VALUES
const values = {
   user: [],
   all: []
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {

      // SET USER TASKS
      case 'user': { return {
         ...state,
         user: action.payload
      }}

      // SET ALL TASKS
      case 'all': { return {
         ...state,
         all: action.payload
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