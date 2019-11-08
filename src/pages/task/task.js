import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

import { task_details } from '../../contracts/task';

import List from '../../components/list';
import TaskActions from '../../components/actions/task';

function Task({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: '',
      owner: '',
      reputation: '',
      reward: '',
      encryption: '',
      locked: ''
   })

   // ON LOAD
   useEffect(() => {
      task_details(match.params.address, state).then(result => {
         set_local(result)
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div>
         <List
            header={ 'task details' }
            data={ local }
         />
         <TaskActions location={ match.params.address } />
      </div>
   )
}

export default Task;