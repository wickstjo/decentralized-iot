import React, { useState, useEffect } from 'react';

function Text({ value, placeholder, range, update, id }) {

   // STYLE STATE
   const [style, set_style] = useState('bad-input');

   // VALIDATE ON INITIAL LOAD
   useEffect(() => {
      validate(value)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // VALIDATE USER INPUT
   function validate(input) {

      // DEFAULT TO FALSE
      let result = false;

      // IF THE REQUIREMENTS ARE MET, SWITCH TO TRUE
      if (isNaN(input) && input.length >= range[0] && input.length <= range[1]) {
         result = true;
      }

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

export default Text;