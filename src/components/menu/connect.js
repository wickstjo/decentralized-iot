import React, { useContext } from 'react';
import { Context } from '../../context';
import { login } from '../../funcs/metamask';
import { shorten } from '../../funcs/misc';

function Connect() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // METAMASK LOGIN
   const metamask_login = () => {
      login(state).then(() => {
         console.log('Metamask login called!')
      })
   }

   // IF METAMASK IS INSTALLED
   if (state.host === 'metamask') {

      if (state.metamask.user !== undefined) {
         return <Item header={ shorten(state.metamask.user) + ' @ ' + state.metamask.network } />
      } else {
         return <Item header={ 'Connect with Metamask' } func={ metamask_login } />
      }

   // OTHERWISE, RETURN NOTHING
   } else { return null; }
}

function Item({ header, func }) {
   return <div className={ 'item' } onClick={ func }>{ header }</div>;
}

export default Connect;