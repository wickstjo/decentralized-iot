import React, { useState, useEffect } from 'react';

function Number({ value, placeholder, range, update, id }) {

   // BACKGROUND STATE
   const [background, set_background] = useState({
      background: '',
   });

   // VALIDATE ON INITIAL LOAD
   useEffect(() => {
      validate(value);
   }, [])

   // VALIDATE USER INPUT
   function validate(input) {

      // DEFAULT TO FALSE
      let result = false;

      // IF THE REQUIREMENTS ARE MET, SWITCH TO TRUE
      if (!isNaN(input) && input >= range[0] && input <= range[1]) {
         result = true;
      }

      // IF NO VALUE WAS GIVEN
      if (input === '') {
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
         value: input,
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
            onChange={ event => { validate(event.target.value) }}
         />
      </div>
   )
}

export default Number;