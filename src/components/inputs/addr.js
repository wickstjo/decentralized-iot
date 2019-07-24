import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

function Addr({ value, placeholder, update, id }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [background, set_background] = useState({
      background: '',
   });

   // UPDATE BACKGROUND BASED ON VALIDATION RESULT
   useEffect(() => {

      // IF THE VALIDATION PASSES
      if (state.web3.utils.isAddress(value)) {
         set_background({
            background: 'green'
         })
      
      // IF NO VALUE WAS ENTERED
      } else if (value === '') {
         set_background({
            background: ''
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
      update({
         value: event.target.value,
         status: state.web3.utils.isAddress(event.target.value) 
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

export default Addr;