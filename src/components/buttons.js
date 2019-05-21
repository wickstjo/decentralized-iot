import React, { useContext } from 'react';
import { Context } from "../context";

function Buttons() {

   // STATE CONTEXT
   const { dispatch } = useContext(Context);
   
   // INCREMENT FUNC
   function increment() {
      dispatch({
         type: 'increment'
      });
   }

   // RESET FUNC
   function reset() {
      dispatch({
         type: 'reset',
         payload: 0
      });
   }

   return (
      <div>
         <button onClick={ increment }>Increment</button>
         <button onClick={ reset }>Reset</button>
      </div>
   );
}

export default Buttons;