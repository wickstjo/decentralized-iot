import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../../context';

import { task_details } from '../../contracts/task';
import { assess } from '../../funcs/blockchain';

import List from '../../components/list';
import AcceptForm from '../../components/forms/accept';
import TaskActions from '../../components/actions/task';
import Error from '../../components/error';

function Task({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: '',
      reputation: '',
      reward: '',
      key: '',
      locked: ''
   })

   // ON LOAD
   useEffect(() => {
      task_details(match.params.address, state).then(result => {
         set_local(result)
      })
   }, [])

   return (
      <div>
         <List
            header={ 'task details' }
            data={ local }
         />
      </div>
   )
}

export default Task;