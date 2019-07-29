import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { init as init_tasks } from '../funcs/task';
import { init as init_token } from '../funcs/token';
import { input as reducer } from '../funcs/reducers';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Number from '../components/inputs/number';

function User() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      price: {
         value: '',
         status: null
      },
      tasks: {
         value: '',
         status: null
      },
      devices: {
         value: '',
         status: null
      },
      users: {
         value: '',
         status: null
      },
      token: {
         value: '',
         status: null
      }
   })

   // SET USER INPUT
   function update(response, id) {
      set_local({
         type: 'field',
         payload: {
            name: id,
            value: response
         }
      })
   }

   // INITIALIZE TOKENinitS
   function token() {
      init_token(local.price, local.tasks, state).then(success => {
         if (success) {
            console.log('tokens initialized')
         }
      })
   }

   // INTIALIZE TASKS
   function tasks() {
      init_tasks(local.devices, local.users, local.token, state).then(success => {
         if (success) {
            console.log('initialized helper contracts')
         }
      })
   }
   
   return (
      <div id={ 'innerbody' }>
         <Button
            header={ 'Initialize Token' }
            func={ token }
            require={[
               local.price.status,
               local.tasks.status
            ]}
         />
         <Number
            placeholder={ 'Token Price' }
            value={ local.price.value }
            range={[ 1, 10 ]}
            update={ update }
            id={ 'price' }
         />
         <Address
            placeholder={ 'Tasks Contract' }
            value={ local.tasks.value }
            update={ update }
            id={ 'tasks' }
         />
         <Button
            header={ 'Initialize Tasks' }
            func={ tasks }
            require={[
               local.devices.status,
               local.users.status,
               local.token.status
            ]}
         />
         <Address
            placeholder={ 'Devices Contract' }
            value={ local.devices.value }
            update={ update }
            id={ 'devices' }
         />
         <Address
            placeholder={ 'Users Contract' }
            value={ local.users.value }
            update={ update }
            id={ 'users' }
         />
         <Address
            placeholder={ 'Token Contract' }
            value={ local.token.value }
            update={ update }
            id={ 'token' }
         />
      </div>
   )
}

export default User;