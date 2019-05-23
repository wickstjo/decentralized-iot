import React, { useContext } from 'react';
import { Context } from "../context";
import { accounts as fetch_accounts } from '../funcs/blockchain';

function Content() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   // LOAD CONTENT AFTER INIT
   if (state.web3 !== null) { 

      // CHECK AVAILABLE ACCOUNTS
      fetch_accounts(state).then(accounts => {
         console.log(accounts);
      })

      return <div>Connection Established</div>
   
   // OTHERWISE, SHOW LOADING SCREEN
   } else { return <div>Loading</div> }
}

export default Content;