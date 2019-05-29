import React, { createContext, useReducer } from "react";

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // BLOCKCHAIN REFERENCES
      case 'blockchain': {
         return {
            ...state,
            contract: action.payload.contract,
            web3: action.payload.web3
         }
      }

      // PROXY DETAILS
      case 'proxy': {
         return {
            ...state,
            connection: action.payload
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
   const [state, dispatch] = useReducer(reducer, {
      contract: undefined,
      web3: undefined,
      connection: {
         network: undefined,
         user: undefined
      }
   });

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