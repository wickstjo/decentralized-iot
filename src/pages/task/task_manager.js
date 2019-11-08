import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../../context';

import { fetch_open, filter } from '../../contracts/task';

import Links from '../../components/links';
import TaskForm from '../../components/forms/task';

function Tasks() {

   // STATES
   const { state } = useContext(Context);
   const [ local, set_local ] = useState([]);

   // ON LOAD
   useEffect(() => {
      fetch_open(state).then(result => {
         set_local(filter(result))
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   return (
      <Fragment>
         <div>
            <Links
               header={ 'open tasks' }
               error={ 'No tasks found.' }
               data={ local }
               section={ 'tasks' }
            />
         </div>
         <div>
            <TaskForm />
         </div>
      </Fragment>
   )
}

export default Tasks;