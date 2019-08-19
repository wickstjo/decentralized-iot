import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { reducer, values } from '../states/tasks';

import { fetch, collection, event, filter } from '../contracts/task';
import { assess } from '../funcs/blockchain';
import { keys } from '../resources/settings';

import Links from '../components/links';
import TaskForm from '../components/forms/task';

function Tasks() {

   // GLOBAL STATE 
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, values);

   // ON LOAD
   useEffect(() => {

      // FETCH ALL TASKS
      fetch(state).then(result => {
         assess({
            next: (all) => {

               // FILTER OUT COMPLETED & SET
               filter(all, state).then(filtered => {
                  
                  // SET ALL TASKS
                  set_local({
                     type: 'all',
                     payload: filtered
                  })
               })

               // FETCH USER TASKS
               collection(keys.public, state).then(result => {
                  assess({
                     next: (user) => {

                        // SET USER TASKS
                        set_local({
                           type: 'user',
                           payload: user
                        })
                     }
                  }, result, dispatch)
               })
            }
         }, result, dispatch)
      })

      // USER ADDED EVENT
      const additions = event({
         name: 'Update',
         action: (values) => {

            // FILTER ALL TASKS
            filter(values.tasks, state).then(filtered => {

               // SET ALL
               set_local({
                  type: 'all',
                  payload: filtered
               })
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
               header={ 'your tasks' }
               error={ 'No tasks found.' }
               data={ local.user }
               url={ 'http://localhost:3000/tasks/' }
            />
         </div>
         <div>
            <Links
               header={ 'available tasks' }
               error={ 'No tasks found.' }
               data={ local.all }
               url={ 'http://localhost:3000/tasks/' }
            />
            <TaskForm />
         </div>
      </Fragment>
   )
}

export default Tasks;