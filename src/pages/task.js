import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { details } from '../contracts/task';
import { assess } from '../funcs/blockchain';

import List from '../components/list';
import AcceptForm from '../components/forms/accept';
import Error from '../components/error';

function Task({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      found: false,
      data: {}
   })

   // ON LOAD
   useEffect(() => {
      if (state.web3.utils.isAddress(match.params.address)) {

         // FETCH TASK DETAILS
         details(match.params.address, state).then(result => {
            assess({
               next: (details) => {
            
                  // SET LOCAL STATE
                  set_local({
                     ...local,
                     found: true,
                     data: details
                  })
               }
            }, result, dispatch)
         })
      }
   }, [])

   // RENDER CONTENT
   switch (local.found) {

      // USER FOUND
      case true: { return (
         <Fragment>
            <div>
               <List
                  header={ 'task details' }
                  data={{
                     "locked": local.data.locked ? 'True' : 'False',
                     "required reputation": local.data.reputation,
                     "reward in wei": local.data.reward,
                     "public encryption key": local.data.encryption
                  }}
               />
            </div>
            <div>
               <AcceptForm task={ match.params.address } />
            </div>
         </Fragment>
      )}

      // USER NOT FOUND
      default: { return (
         <Error reason={ 'Task does not exist!' } />
      )}
   }
}

export default Task;