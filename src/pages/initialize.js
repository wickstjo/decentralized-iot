import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { init as init_tasks } from '../contracts/task';
import { init as init_token } from '../contracts/token';
import { assess } from '../funcs/blockchain';
import reducer from '../states/input';
import latest from '../resources/latest.json';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Number from '../components/inputs/number';

function User() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      price: {
         value: '',
         status: null
      },
      tasks: {
         value: latest.tasks.address,
         status: null
      },
      devices: {
         value: latest.devices.address,
         status: null
      },
      users: {
         value: latest.users.address,
         status: null
      },
      token: {
         value: latest.token.address,
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
      init_token(local.price.value, local.tasks.value, state).then(result => {
         assess({
            msg: 'token contract initiated'
         }, result, dispatch)
      })
   }

   // INTIALIZE TASKS
   function tasks() {
      init_tasks(local.devices.value, local.users.value, local.token.value, state).then(result => {
         assess({
            msg: 'tasks contract initiated'
         }, result, dispatch)
      })
   }
   
   return (
      <div>
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
            range={[ 1000, 100000 ]}
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