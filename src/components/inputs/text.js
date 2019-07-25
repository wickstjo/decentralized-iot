import React, { useState } from 'react';

function Text({ value, placeholder, range, update, id }) {

   // BACKGROUND STATE
   const [background, set_background] = useState({
      background: '',
   });

   // VALIDATE USER INPUT
   function validate(event) {

      // DEFAULT TO FALSE
      let result = false;

      // IF THE REQUIREMENTS ARE MET, SWITCH TO TRUE
      if (isNaN(event.target.value) && event.target.value.length >= range[0] && event.target.value.length <= range[1]) {
         result = true;
      }

      // IF NO VALUE WAS GIVEN
      if (event.target.value === '') {
         set_background({
            background: ''
         })

      // IF THE VALIDATION PASSES
      } else if (result) {
         set_background({
            background: 'green'
         })
      
      
      // IF THE VALIDATION FAILS
      } else {
         set_background({
            background: 'red'
         })
      }

      // UPDATE PARENT STATE
      update({
         value: event.target.value,
         status: result
      }, id)
   }

   return (
      <div>
         <input
            type={ 'text' }
            placeholder={ placeholder }
            value={ value }
            style={ background }
            onChange={ validate }
         />
      </div>
   )
}

export default Text;