import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { reducer, values } from '../states/tasks';

import { tasks, history, event, filter } from '../contracts/task';
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
      tasks(state).then(result => { assess({
         next: (tasks) => {

            // FILTER OUT COMPLETED & SET
            filter(tasks, state).then(filtered => {
               
               // SET OPEN
               set_local({
                  type: 'open',
                  payload: filtered
               })
            })

            // FETCH USER HISTORY
            history(state).then(result => { assess({
               next: (history) => {

                  // SET HISTORY
                  set_local({
                     type: 'history',
                     payload: history
                  })
               }
            }, result, dispatch) })
         }
      }, result, dispatch) })

      // TASK ADDED EVENT
      const additions = event({
         name: 'Update',
         action: (values) => {

            // FILTER OUT COMPLETED
            filter(values.tasks, state).then(filtered => {

               // SET OPEN
               set_local({
                  type: 'open',
                  payload: filtered
               })
            })

            // IF RELATED TO THE USER
            if (values.user === state.keys.public) {

               // SET HISTORY
               set_local({
                  type: 'history',
                  payload: values.history
               })
            }
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
               data={ local.history }
               url={ 'http://localhost:3000/tasks/' }
            />
         </div>
         <div>
            <Links
               header={ 'available tasks' }
               error={ 'No tasks found.' }
               data={ local.open }
               url={ 'http://localhost:3000/tasks/' }
            />
            <TaskForm />
         </div>
      </Fragment>
   )
}

export default Tasks;