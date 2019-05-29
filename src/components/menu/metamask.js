import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import { connect } from '../../funcs/blockchain';

function Connect() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      authed: false
   })

   useEffect(() => {
      if (state.connection.user !== undefined) {
         set_local({
            ...local,
            authed: true
         })
      } else {
         set_local({
            ...local,
            authed: false
         })
      }
   }, [state.connection.user])

   const metamask_login = () => {
      connect(state.web3)
   }

   if (local.authed) {
      return <div className={ 'item' }>Connected</div>;
   } else {
      return <div className={ 'item' } onClick={ metamask_login }>Connect with Metamask</div>
   }
}

export default Connect;