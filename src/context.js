import React, { createContext, useReducer } from "react";

// INITIAL STATE
const init_state = {
   block: 0,
   route: []
};

// CONTEXT REDUCER
function reducer(state, action) {
   switch (action.type) {

      // INCREMENT
      case 'increment': {
         return {
            ...state,
            block: state.block + 1
         }
      }
      
      // RESET
      case 'reset': {
         return {
            ...state,
            block: action.payload
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