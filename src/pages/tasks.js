import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { fetch, event, filter } from '../contracts/task';
import { assess } from '../funcs/blockchain';

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
         assess({
            next: () => {

               // FILTER OUT COMPLETED & SET
               filter(result.data, state).then(results => {
                  set_local(results)
               })
            }
         }, result, dispatch)
      })

      // USER ADDED EVENT
      const additions = event(state);

      // SUBSCRIBE
      additions.on('data', event => {
         filter(event.returnValues.tasks, state).then(results => {
            set_local(results)
         })
      })

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