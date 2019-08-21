import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { reducer, values } from '../states/tasks';

import { fetch, event, filter } from '../contracts/task';
import { assess } from '../funcs/blockchain';

import Links from '../components/links';
import TaskForm from '../components/forms/task';

function Tasks() {

   // STATES
   const { state, dispatch } = useContext(Context);
   const [ local, set_local ] = useReducer(reducer, values);

   // ON LOAD
   useEffect(() => {

      // FETCH ALL OPEN TASKS
      fetch(state).then(result => { assess({
         next: (tasks) => {

            // SET OPEN
            set_local({
               type: 'open',
               payload: filter(tasks)
            })
         }
      }, result, dispatch) })

      // TASK ADDED EVENT
      const additions = event({
         name: 'Update',
         action: (values) => {

            // SET OPEN
            set_local({
               type: 'open',
               payload: filter(values.tasks)
            })
         }
      }, state)

      // UNSUBSCRIBE
      return () => {
         additions.unsubscribe();
      }
   }, [])
   
   return (
      <Fragment>
         <div>
            <Links
               header={ 'available tasks' }
               error={ 'No tasks found.' }
               data={ local.open }
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