import React, { useContext } from 'react';
import { Context } from '../context';
import { my_func, my_var } from '../funcs/blockchain';

function Administrate() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // DEPLOYED SMART CONTRACT NETWORK
   const network = 'DEV';

   // CHECK USER NETWORK BEFORE EXECUTING FUNC
   const check = (callback) => {
      if (state.metamask.network === network) {
         callback();

      // IF IT DOESNT MATCH, LOG ERROR
      } else { console.log('wrong network') }
   }

   // CALL FUNCTION
   const call_func = () => {
      check(() => {
         my_func(state).then(response => {
            console.log(response)
         })
      })
   }

   // FETCH VARIABLE
   const call_var = () => {
      check(() => {
         my_var(state).then(response => {
            console.log(response)
         })
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
      </div>
   )
}

function Item({ header, func }) { return (
   <span className={ 'item' } onClick={ func }>{ header }</span>
)}

export default Administrate;