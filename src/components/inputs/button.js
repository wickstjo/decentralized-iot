import React, { useState, useEffect } from 'react';
import { check_validation } from '../../funcs/misc';

function Button({ header, func, require }) {

   // STYLE STATE
   const [style, set_style] = useState('bad-button')

   // ON INITIAL LOAD, VALIDATE
   useEffect(() => {
      validate()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // WHEN THE require CHANGE, REVALIDATE
   useEffect(() => {
      validate();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [require])

   // VALIDATE require
   function validate() {

      // CHECK VALIDATION
      const result = check_validation(require);

      // IF THE VALIDATION PASSED
      if (result) {
         set_style('good-button')

      // OTHERWISE
      } else {
         set_style('bad-button')
      }
   }

   // ASSESS APPROPRIATE TRIGGER FUNCTION
   function execute() {

      // NORMAL FUNCTION
      if (style === 'good-button') {
         func();

      // OTHERWISE, PROMPT ERROR
      } else { console.log('the requirement was not met') }
   }

   return (
      <span className={ 'button-container' }>
         <span className={ style } onClick={ execute }>
            { header }
         </span>
      </span>
   )
}

export default Button;