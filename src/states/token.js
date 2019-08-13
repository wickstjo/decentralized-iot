// DEFAULT VALUES
const values = {
   price: 'Not Available',
   balance: 'Not Available'
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {
       
      // SET USER DATA
      case 'price': { return {
         ...state,
         price: action.payload
      }}

      // SET COLLECTION DATA
      case 'balance': { return {
         ...state,
         balance: action.payload
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