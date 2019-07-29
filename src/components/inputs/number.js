import React, { useState, useEffect } from 'react';

function Number({ value, placeholder, range, update, id }) {

   // STYLE STATE
   const [style, set_style] = useState('bad-input');

   // VALIDATE ON INITIAL LOAD
   useEffect(() => {
      validate(value)
   }, [])

   // VALIDATE USER INPUT
   function validate(input) {

      // DEFAULT TO FALSE
      let result = false;

      // IF THE REQUIREMENTS ARE MET, SWITCH TO TRUE
      if (!isNaN(input) && input >= range[0] && input <= range[1]) {
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

export default Number;