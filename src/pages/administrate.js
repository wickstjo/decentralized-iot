import React, { useContext } from 'react';
import { Context } from '../context';
import { temp } from '../funcs/blockchain';

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

   // PERFORM CROSS CONTRACT QUERY
   const query = () => {
      check(() => {
         temp(state).then(response => {
            console.log(response)
         })
      })
   }

   return (
      <div id={ 'innerbody' }>
         <Item
            header={ 'Cross Contract Query' }
            func={ query }
         />
      </div>
   )
}

function Item({ header, func }) { return (
   <span className={ 'item' } onClick={ func }>{ header }</span>
)}

export default Administrate;