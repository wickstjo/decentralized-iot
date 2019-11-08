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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
         type: 'field',
         payload: {
            name: id,
            value: {
               value: input,
               status: result
            }
         }
      })
   }

   return (
      <input
         type={ 'text' }
         className={ style }
         placeholder={ placeholder }
         value={ value }
         onChange={ event => { validate(event.target.value) }}
      />
   )
}

export default Address;