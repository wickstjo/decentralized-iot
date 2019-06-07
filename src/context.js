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
            host: action.payload.host,
            contracts: action.payload.contracts
         }
      }

      // PROXY NETWORK
      case 'network': {
         return {
            ...state,
            metamask: {
               ...state.metamask,
               network: action.payload
            }
         }
      }

      // PROXY USER
      case 'user': {
         return {
            ...state,
            metamask: {
               ...state.metamask,
               user: action.payload
            }
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
      proxy: undefined,
      host: undefined,
      metamask: {
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