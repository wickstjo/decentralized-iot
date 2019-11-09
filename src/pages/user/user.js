import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

import { user_overview } from '../../contracts/user';

import List from '../../components/list';
import Inspector from '../../components/inspector';

function User({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [ local, set_local ] = useState({
      details: {
         name: '',
         reputation: 0
      },
      completed: []
   })

   // ON LOAD
   useEffect(() => {
      user_overview(match.params.address, state).then(result => {

         // FETCH USER DETAILS & COMPLETED TASKS
         const { details, completed } = result;

         // SET BOTH
         set_local({
            details: details,
            completed: completed
         })
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div>
         <List
            header={ 'user details' }
            data={ local.details }
         />
         <Inspector
            header={ 'completed tasks' }
            error={ 'No tasks found' }
            data={ local.completed }
            state={ state }
            user={ match.params.address }
         />
      </div>
   )
}

export default User;