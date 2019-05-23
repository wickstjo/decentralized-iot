import React, { createContext, useReducer } from "react";

// INITIAL STATE
const init_state = {
   contract: null,
   web3: null
};

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // BLOCKCHAIN REFERENCES
      case 'blockchain': {
         return {
            ...state,
            contract: action.payload.contract,
            web3: action.payload.web3,
         }
      }

      // FALLBACK
      default: {
         return state;
      }
   }
};

// DECLARE CONTEXT
const Context = createContext();

// CONTEXT PROVIDER
function Provider({ children }) {

   // ATTACH THE REDUCER
   const [state, dispatch] = useReducer(reducer, init_state);

   return (
      <Context.Provider value={{ state, dispatch }}>
         { children }
      </Context.Provider>
   );
}

export {
   Context,
   Provider
};