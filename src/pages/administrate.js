import React, { useContext } from 'react';
import { Context } from '../context';
import { my_func, my_var, accounts } from '../funcs/blockchain';

function Administrate() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   // CALL FUNCTION
   const call_func = () => {

      // IF ON THE CORRECT NETWORK
      if (state.metamask.network === 'development') {

         my_func(state).then(response => {
            console.log(response)
         });

      // OTHERWISE, LOG ERROR
      } else { console.log('wrong network') }
   }

   // FETCH VARIABLE
   const call_var = () => {

      // IF ON THE CORRECT NETWORK
      if (state.metamask.network === 'development') {

         my_var(state).then(response => {
            console.log(response)
         });
      
      // OTHERWISE, LOG ERROR
      } else { console.log('wrong network') }
   }

   const call_accounts = () => {
      accounts(state).then(response => {
         console.log(response);
      })
   }

   return (
      <div id={ 'innerbody' }>
         <Item
            header={ 'Call Function' }
            func={ call_func }
         />
         <Item
            header={ 'Call Variable' }
            func={ call_var }
         />
         <Item
            header={ 'Call Metamask Accounts' }
            func={ call_accounts }
         />
      </div>
   )
}

function Item({ header, func }) { return (
   <span className={ 'item' } onClick={ func }>{ header }</span>
)}

export default Administrate;