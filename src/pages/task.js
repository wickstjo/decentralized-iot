import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';

function Task({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      found: false,
      address: ''
   })

   // FETCH DETAILS
   useEffect(() => {

      // MAKE SURE QUERY IS AN ADDRESS
      if (state.web3.utils.isAddress(match.params.address)) {
         
         // SET LOCAL STATE
         set_local({
            ...local,
            found: true,
            address: match.params.address
         })

      // OTHERWISE, LOG ERROR
      } else {
         dispatch({
            type: 'add-message',
            payload: {
               type: 'bad',
               text: 'not a valid address'
            }
         })
      }
   }, [])

   // RENDER CONTENT
   switch (local.found) {

      // USER FOUND
      case true: { return (
         <div>Task Found</div>
      )}

      // USER NOT FOUND
      default: { return (
         <div>Task was NOT found!</div>
      )}
   }
}

export default Task;