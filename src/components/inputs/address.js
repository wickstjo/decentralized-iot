import React, { useContext, useState } from 'react';
import { Context } from '../../context';

function Address({ value, placeholder, update, id }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // BACKGROUND STATE
   const [background, set_background] = useState({
      background: '',
   })

   // VALIDATE USER INPUT
   function validate(event) {

      // PERFORM CHECK
      const result = state.web3.utils.isAddress(event.target.value); 

      // IF NO VALUE WAS ENTERED
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

export default Address;