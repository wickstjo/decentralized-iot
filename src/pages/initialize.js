import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { init as init_tasks } from '../funcs/task';
import { init as init_token } from '../funcs/token';
import Button from '../components/button';

function User() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      price: '',
      tasks: '',
      devices: '',
      users: '',
      token: ''
   })

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         ...local,
         [event.target.id]: event.target.value
      })
   }

   // INITIALIZE TOKENinitS
   function token() {
      if (state.web3.utils.isAddress(local.tasks)) {
         init_token(local.price, local.tasks, state).then(success => {
            if (success) {
               console.log('tokens initialized')
            }
         })
      } else { console.log('tasks is not an address') }
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
         <div>
            <Button
               header={ 'Initialize Token' }
               func={ token }
            />
         </div>
         <div>
            <input
               type={ 'number' }
               placeholder={ 'Token Price' }
               value={ local.price }
               onChange={ update }
               id={ 'price' }
            />
            <input
               type={ 'text' }
               placeholder={ 'Tasks Address' }
               value={ local.tasks }
               onChange={ update }
               id={ 'tasks' }
               min={ '1' }
               max={ '10' }
            />
         </div>
         <div>
            <Button
               header={ 'Initialize Tasks' }
               func={ tasks }
            />
         </div>
         <div>
            <input
               type={ 'text' }
               placeholder={ 'devices contract' }
               value={ local.devices }
               onChange={ update }
               id={ 'devices' }
            />
            <input
               type={ 'text' }
               placeholder={ 'users contract' }
               value={ local.users }
               onChange={ update }
               id={ 'users' }
            />
            <input
               type={ 'text' }
               placeholder={ 'token contract' }
               value={ local.token }
               onChange={ update }
               id={ 'token' }
            />
         </div>
      </div>
   )
}

export default User;