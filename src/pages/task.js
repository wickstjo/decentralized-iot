import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { fetch, add, details, accept, submit, release } from '../funcs/task';
import reducer from '../states/input';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Number from '../components/inputs/number';
import Text from '../components/inputs/text';

function Task() {

   // GLOBAL STATE 
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      expires: {
         value: '',
         status: null
      },
      reputation: {
         value: '',
         status: null
      },
      reward: {
         value: '',
         status: null
      },
      encryption: {
         value: '',
         status: null
      },
      task: {
         value: '',
         status: null
      },
      device: {
         value: '',
         status: null
      },
      ipfs: {
         value: '',
         status: null
      }
   });

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
   
   // FETCH ALL TASKS
   function Fetch() {
      fetch(state).then(({ success, data }) => {
         if (success) {
            console.log(data);
         }
      })
   }

   // ADD TASK
   function Add() {
      add({
         expires: local.expires,
         reputation: local.reputation,
         reward: local.reward,
         encryption: local.encryption
      }, state).then(success => {
         if (success) {
            console.log('added task')
         }
      })
   }

   // FETCH TASK DETAILS
   function Details() {
      details(local.task, state).then(({ success, data }) => {
         if (success) {
            console.log(data);
         }
      })
   }

   // ACCEPT TASK
   function Accept() {
      accept(local.task, local.device, state).then(success => {
         if (success) {
            console.log('accepted task')
         }
      })
   }

   // SUBMIT DATA TO TASK
   function Submit() {
      submit(local.task, local.ipfs, state).then(success => {
         if (success) {
            console.log('data submitted')
         }
      })
   }

   // RELEASE TASK
   function Release() {
      release(local.task, state).then(success => {
         if (success) {
            console.log('contract released')
         }
      })
   }
   
   return (
      <div>
         <Button
            header={ 'Fetch' }
            func={ Fetch }
         />
         <Button
            header={ 'Add' }
            func={ Add }
            require={[
               local.expires.status,
               local.reputation.status,
               local.encryption.status,
               local.reward.status
            ]}
         />
         <Number
            placeholder={ 'Expiration Date' }
            value={ local.expires.value }
            range={[ 1, 10 ]}
            update={ update }
            id={ 'expires' }
         />
         <Number
            placeholder={ 'Minimum Reputation' }
            value={ local.reputation.value }
            range={[ 1, 10 ]}
            update={ update }
            id={ 'reputation' }
         />
         <Text
            placeholder={ 'Public Encryption Key' }
            value={ local.encryption.value }
            range={[ 5, 20 ]}
            update={ update }
            id={ 'encryption' }
         />
         <Number
            placeholder={ 'Reward in Wei' }
            value={ local.reward.value }
            range={[ 1, 10 ]}
            update={ update }
            id={ 'reward' }
         />
         <Button
            header={ 'Details' }
            func={ Details }
            require={[ local.task.status ]}
         />
         <Button
            header={ 'Accept' }
            func={ Accept }
            require={[
               local.task.status,
               local.device.status
            ]}
         />
         <Button
            header={ 'Submit' }
            func={ Submit }
            require={[
               local.task.status,
               local.device.status,
               local.ipfs.status
            ]}
         />
         <Button
            header={ 'Release' }
            func={ Release }
            require={[ local.task.status ]}
         />
         <Address
            placeholder={ 'Task Address' }
            value={ local.task.value }
            update={ update }
            id={ 'task' }
         />
         <Address
            placeholder={ 'Device Address' }
            value={ local.device.value }
            update={ update }
            id={ 'device' }
         />
         <Text
            placeholder={ 'IPFS Hash' }
            value={ local.ipfs.value }
            range={[ 5, 20 ]}
            update={ update }
            id={ 'ipfs' }
         />
      </div>
   )
}

export default Task;