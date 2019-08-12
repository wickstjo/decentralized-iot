import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { fetch } from '../contracts/task';

import Links from '../components/links';
import TaskForm from '../components/forms/task';

function Tasks() {

   // GLOBAL STATE 
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState([])

   // FETCH ALL TASKS
   useEffect(() => {
      fetch(state).then(result => {
         if (result.success) {

            // ON SUCCESS
            set_local(result.data)
            
         } else {

            // ON ERROR
            dispatch({
               type: 'add-message',
               payload: {
                  type: 'bad',
                  text: result.reason
               }
            })
         }
      })
   }, [])
   
   return (
      <Fragment>
         <div>
            <Links
               header={ 'available tasks' }
               error={ 'No tasks found.' }
               data={ local }
               url={ 'http://localhost:3000/tasks/' }
            />
         </div>
         <div>
            <TaskForm />
         </div>
      </Fragment>
   )
}

export default Tasks;