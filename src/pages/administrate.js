import React, { useContext } from 'react';
import { Context } from '../context';
import { my_func, my_var, accounts } from '../funcs/blockchain';

function Administrate() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   const call_func = () => {
      my_func(state.contract).then(response => {
         console.log(response)
      });
   }

   const call_var = () => {
      my_var(state.contract).then(response => {
         console.log(response)
      });
   }

   const call_accounts = () => {
      accounts(state.web3).then(response => {
         console.log(response);
      })
   }

   if (state.connected) {
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

   // OTHERWISE, SHOW LOADING
   } else { return <div>Loading...</div> }
}

function Item({ header, func }) { return (
   <span className={ 'item' } onClick={ func }>{ header }</span>
)}

export default Administrate;