import React, { useState, useEffect } from 'react';

function Num({ value, placeholder, range, update, id }) {

   // LOCAL STATE
   const [background, set_background] = useState({
      background: '',
   });

   // UPDATE BACKGROUND BASED ON VALIDATION RESULT
   useEffect(() => {

      // IF THE VALIDATION PASSES
      if (!isNaN(value)) {
         set_background({
            background: 'green'
         })
      
      // IF NO VALUE WAS ENTERED
      } else if (value === '') {
         set_background({
            background: ''
         })

      // IF THE VALUE ISNT HIGHER THAN ZERO
      } else if (value <= 0) {
         set_background({
            background: 'red'
         })
      
      // IF THE VALIDATION FAILS
      } else {
         set_background({
            background: 'red'
         })
      }
   }, [value])

   // VALIDATE & UPDATE PARENT STATE
   function validate(event) {

      // DEFAULT TO FALSE
      const check = false;

      // IF THE REQUIREMENT IS MET, SWITCH TO TRUE
      if (event.target.value > 0 || !isNaN(value)) {
         check = true;
      }

      update({
         value: event.target.value,
         status: check 
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
            min={ range[0] }
            max={ range[1] }
         />
      </div>
   )
}

export default Num;