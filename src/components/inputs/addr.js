import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

function Addr({ value, placeholder, update, id }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [background, set_background] = useState({
      background: 'red',
   });

   // UPDATE BACKGROUND BASED ON VALIDATION
   useEffect(() => {
      if (state.web3.utils.isAddress(value)) {

         // VALIDATION PASSES
         set_background({
            background: 'green'
         })
      } else {

         // SOMETHING IS WRONG
         set_background({
            background: 'red'
         })
      }
   }, [value])

   // VALIDATE & UPDATE PARENT STATE
   function validate(event) {
      update({
         value: event.target.value,
         status: state.web3.utils.isAddress(event.target.value) 
      }, id)
   }

   return (
      <input
         type={ 'text' }
         placeholder={ placeholder }
         value={ value }
         style={ background }
         onChange={ validate }
      />
   )
}

export default Addr;