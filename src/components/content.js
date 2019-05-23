import React, { useContext, useEffect } from 'react';
import { Context } from "../context";
import { accounts as fetch_accounts } from '../funcs/blockchain';

function Content() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   useEffect(() => {
      if (state.web3 != null) {
         fetch_accounts(state).then(accounts => {
            console.log(accounts);
        })
      }
   }, [state.web3])

   return <div>Content</div>
}

export default Content;