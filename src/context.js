import React, { createContext, useReducer } from "react";

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // BLOCKCHAIN REFERENCES
      case 'blockchain': {
         return {
            ...state,
            web3: action.payload.web3,
            proxy: action.payload.proxy,
            contracts: action.payload.contracts
         }
      }

      // PROXY NETWORK
      case 'network': {
         return {
            ...state,
            network: action.payload
         }
      }

      // PROXY USER
      case 'user': {
         return {
            ...state,
            user: action.payload
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
      contracts: undefined,
      web3: undefined,
      proxy: null,
      network: undefined,
      user: undefined
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