import React, { useContext } from 'react';
import { Context } from '../context';
import { fetch_devices } from '../funcs/blockchain';

function Administrate() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // PERFORM CROSS CONTRACT QUERY
   const query = () => {
      fetch_devices(state).then(foo => {
         console.log(foo)
      });
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