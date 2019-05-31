import React, { useContext } from 'react';
import { Context } from '../context';
import { add, everyone, person } from '../funcs/blockchain';

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

   const add_person = () => {
      add(state, 'foobar').then(response => {
         console.log(response)
      })
   }

   const fetch_person = () => {
      person(state.contract, 0).then(response => {
         console.log(response)
      })
   }

   const fetch_everyone = () => {
      everyone(state).then(response => {
         console.log(response)
      })
   }

   return (
      <div id={ 'innerbody' }>
         <Item
            header={ 'Add Person' }
            func={ add_person }
         />
         <Item
            header={ 'Fetch Person' }
            func={ fetch_person }
         />
         <Item
            header={ 'Fetch Everyone' }
            func={ fetch_everyone }
         />
      </div>
   )
}

function Item({ header, func }) { return (
   <span className={ 'item' } onClick={ func }>{ header }</span>
)}

export default Administrate;