import React, { useContext, useState } from 'react';
import { Context } from '../../context';
import { Redirect } from 'react-router-dom';

import { release } from '../../contracts/task';
import { assess } from '../../funcs/blockchain';

import Button from '../inputs/button';

function Task({ location }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [ local, set_local ] = useState(false)

   // ADD DEVICE
   function Release() {
      release(location, state).then(result => {
         assess({
            msg: 'task released successfully',
            next: () => {

               // REDIRECT AWAY
               set_local(true)
            }
         }, result, dispatch)
      })
   }

   // DETERMINE CONTENT
   switch (local) {

      // NORMAL RENDER
      case false: { return (
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'release task' }
               func={ Release }
            />
         </div>
      )}

      // REDIRECT POST RELEASE
      default: {
         return <Redirect to={ '/tasks' } />
      }
   }
}

export default Task;

