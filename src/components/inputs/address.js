import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

function Address({ value, placeholder, update, id }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // STYLE STATE
   const [style, set_style] = useState('bad-input');

   // VALIDATE ON INITIAL LOAD
   useEffect(() => {
      validate(value);
   }, [])

   // VALIDATE USER INPUT
   function validate(input) {

      // PERFORM CHECK
      const result = state.web3.utils.isAddress(input); 

      // CHANGE STYLE
      switch(result) {

         // IF THE VALIDATION PASSES
         case true:
            set_style('good-input')
         break;

         // OTHERWISE
         default: {
            set_style('bad-input')
         }
      }

      // UPDATE PARENT STATE
      update({
         value: input,
         status: result
      }, id)
   }

   return (
      <div className={ style }>
         <input
            type={ 'text' }
            placeholder={ placeholder }
            value={ value }
            onChange={ event => { validate(event.target.value) }}
         />
      </div>
   )
}

export default Address;