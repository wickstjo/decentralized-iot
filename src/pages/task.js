import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
import { details } from '../contracts/task';

import List from '../components/list';

function Task({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      found: false,
      data: {}
   })

   // FETCH DETAILS
   useEffect(() => {

      // MAKE SURE QUERY IS AN ADDRESS
      if (state.web3.utils.isAddress(match.params.address)) {

         // CHECK IF TASK EXISTS
         details(match.params.address, state).then(result => {
            if (result.success) {

               // SET LOCAL STATE
               set_local({
                  ...local,
                  found: true,
                  data: result.data
               })
            }
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
         <div>
            <List
               header={ 'task details' }
               data={{
                  "expiration date": local.data.expires,
                  "locked": local.data.locked ? 'True' : 'False',
                  "required reputation": local.data.reputation,
                  "reward in wei": local.data.reward,
                  "public encryption key": local.data.encryption
               }}
            />
         </div>
      )}

      // USER NOT FOUND
      default: { return (
         <div>Task was NOT found!</div>
      )}
   }
}

export default Task;