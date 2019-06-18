import React, { useContext } from 'react';
import { Context } from '../context';
import { network } from '../resources/settings.json';
import { fetch_user, add_user } from '../funcs/blockchain';

function Home() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // FETCH USER
   const fetch = () => {
      fetch_user(state).then(response => {
         console.log(response)
      })
   }

   // ADD USER
   const add = () => {
      add_user(state, 'foobar').then(() => {
         console.log('user added successfully');
      })
   }

   // RENDER BUTTONS IF USER IS ON THE CORRECT NETWORK
   if (state.metamask.network === network) { return (

      <div id={ 'innerbody' }>
         <Item
            header={ 'Fetch User' }
            func={ fetch }
         />
         <Item
            header={ 'Add User' }
            func={ add }
         />
      </div>

   // OTHERWISE, SHOW ERROR MESSAGE
   )} else { return <div>You are on the wrong network!</div> }
}

function Item({ header, func }) { return (
   <span className={ 'item' } onClick={ func }>{ header }</span>
)}

export default Home;