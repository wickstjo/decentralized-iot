// DEFAULT VALUES
const values = {
   price: 0,
   balance: 0
}

// FUNCTION TYPES
function reducer(state, action) {
   switch (action.type) {

      // SET PRICE
      case 'price': { return {
         ...state,
         price: action.payload
      }}

      // SET BALANCE
      case 'balance': { return {
         ...state,
         balance: action.payload
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