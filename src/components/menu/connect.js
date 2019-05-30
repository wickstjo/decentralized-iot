import React, { useContext } from 'react';
import { Context } from '../../context';
import { connect } from '../../funcs/blockchain';

function Connect() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   const metamask_login = () => {
      connect(state)
   }

   // IF METAMASK IS INSTALLED
   if (state.web3._currentProvider.host === 'metamask') {

      if (state.metamask.user !== undefined) {
         return <Item header={ state.metamask.user } />
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