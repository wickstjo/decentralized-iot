import React, { createContext, useReducer } from "react";

// INITIAL STATE
const init_state = {
   web3: null
};

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      case 'web3': {
         return {
            ...state,
            web3: action.payload
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
function Provider(props) {

   // ATTACH THE REDUCER
   const [state, dispatch] = useReducer(reducer, init_state);

   return (
      <Context.Provider value={{ state, dispatch }}>
         { props.children }
      </Context.Provider>
   );
}

export {
   Context,
   Provider
};