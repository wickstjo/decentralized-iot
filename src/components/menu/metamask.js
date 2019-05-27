import React, { useContext } from 'react';
import { Context } from '../../context';
import { connect } from '../../funcs/blockchain';

function Connect() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   const metamask_login = () => {
      connect(state.web3)
   }

   // if (state.web3 !== null && state.web3.givenProvider.selectedAddress === undefined) {
   //    console.log(state.web3.givenProvider.selectedAddress)
   // }

   if (state.web3 !== null && state.web3.givenProvider.selectedAddress === undefined) {
      return <div className={ 'item' } onClick={ metamask_login }>Connect Metamask</div>
   } else {
      return null;
   }
}

export default Connect;