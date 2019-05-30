import React, { useContext } from 'react';
import { Context } from '../../context';
import { connect } from '../../funcs/blockchain';

function Connect() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   const metamask_login = () => {
      connect(state.web3)
   }

   if (state.user !== undefined) {
      return <div className={ 'item' }>Connected</div>;
   } else {
      return <div className={ 'item' } onClick={ metamask_login }>Connect with Metamask</div>
   }
}

export default Connect;