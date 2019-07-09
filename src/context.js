import React, { createContext, useReducer } from "react";

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // CONNECT WITH BLOCKCHAIN GATEWAY
      case 'connect': {
         return {
            ...state,
            web3: action.payload.web3,
            contracts: action.payload.contracts,
            interface: action.payload.interface
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
      web3: undefined,
      contracts: undefined,
      interface: undefined
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