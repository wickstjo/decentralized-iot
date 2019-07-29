import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

function Address({ value, placeholder, update, id }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // BACKGROUND STATE
   const [background, set_background] = useState({
      background: '',
   })

   // VALIDATE ON INITIAL LOAD
   useEffect(() => {
      validate(value);
   }, [])

   // VALIDATE USER INPUT
   function validate(input) {

      // PERFORM CHECK
      const result = state.web3.utils.isAddress(input); 

      // IF NO VALUE WAS ENTERED
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

export default Address;