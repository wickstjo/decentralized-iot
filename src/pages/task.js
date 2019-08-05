import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { fetch, add, details, accept, submit, release } from '../funcs/task';
import reducer from '../states/input';
import { assess } from '../funcs/blockchain';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Number from '../components/inputs/number';
import Text from '../components/inputs/text';

function Task() {

   // GLOBAL STATE 
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      expires: {
         value: Date.now() + 200000,
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
         value: 'QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx',
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
      fetch(state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }

   // ADD TASK
   function Add() {
      add({
         expires: local.expires.value,
         reputation: local.reputation.value,
         reward: local.reward.value,
         encryption: local.encryption.value
      }, state).then(result => {
         assess({
            msg: 'task posted successfully'
         }, result, dispatch)
      })
   }

   // FETCH TASK DETAILS
   function Details() {
      details(local.task.value, state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }

   // ACCEPT TASK
   function Accept() {
      accept(local.task.value, local.device.value, state).then(result => {
         assess({
            msg: 'task accepted successfully'
         }, result, dispatch)
      })
   }

   // SUBMIT DATA TO TASK
   function Submit() {
      submit(local.task.value, local.ipfs.value, state).then(result => {
         assess({
            msg: 'data submitted successfully'
         }, result, dispatch)
      })
   }

   // RELEASE TASK
   function Release() {
      release(local.task.value, state).then(result => {
         assess({
            msg: 'task released successfully'
         }, result, dispatch)
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
            range={[ Date.now(), Infinity ]}
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
            range={[ 1000, 100000 ]}
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
         <Text
            placeholder={ 'Device Hash' }
            value={ local.device.value }
            range={[ 64, 64 ]}
            update={ update }
            id={ 'device' }
         />
         <Text
            placeholder={ 'IPFS Hash' }
            value={ local.ipfs.value }
            range={[ 46, 46 ]}
            update={ update }
            id={ 'ipfs' }
         />
      </div>
   )
}

export default Task;