import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { fetch, add, status, toggle, task, assign } from '../funcs/device';
import reducer from '../states/input';
import { assess } from '../funcs/blockchain';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Text from '../components/inputs/text';

function Device() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      hash: {
         value: 'cdbde0df13a59633a2a55ee9342d9b31650ae27c0a3c0d80bab4b1561f4df16e',
         status: null
      },
      name: {
         value: '',
         status: null
      },
      device: {
         value: '',
         status: null
      },
      task: {
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

   // FETCH DEVICE ADDRESS
   function Fetch() {
      fetch(local.hash.value, state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }

   // ADD DEVICE
   function Add() {
      add(local.hash.value, local.name.value, state).then(result => {
         assess({
            msg: 'device added successful'
         }, result, dispatch)
      })
   }

   // FETCH DEVICE ADDRESS
   function Status() {
      status(local.device.value, state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }

   // FETCH DEVICE ADDRESS
   function Toggle() {
      toggle(local.device.value, state).then(result => {
         assess({
            msg: 'status toggled successful'
         }, result, dispatch)
      })
   }

   // FETCH DEVICE ADDRESS
   function Task() {
      task(local.device.value, state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }

   // FETCH DEVICE ADDRESS
   function Assign() {
      assign(local.device.value, local.task.value, state).then(result => {
         assess({
            msg: 'task assigned successful'
         }, result, dispatch)
      })
   }

   return (
      <div>
         <Button
            header={ 'Fetch' }
            func={ Fetch }
            require={[ local.hash.status ]}
         />
         <Button
            header={ 'Add' }
            func={ Add }
            require={[
               local.hash.status,
               local.name.status
            ]}
         />
         <Text
            placeholder={ 'Device Hash' }
            value={ local.hash.value }
            range={[ 64, 64 ]}
            update={ update }
            id={ 'hash' }
         />
         <Text
            placeholder={ 'Device Name' }
            value={ local.name.value }
            range={[ 3, 15 ]}
            update={ update }
            id={ 'name' }
         />
         <Button
            header={ 'Status' }
            func={ Status }
            require={[ local.device.status ]}
         />
         <Button
            header={ 'Toggle' }
            func={ Toggle }
            require={[ local.device.status ]}
         />
         <Button
            header={ 'Current Task' }
            func={ Task }
            require={[
               local.device.status
            ]}
         />
         <Button
            header={ 'Assign Task' }
            func={ Assign }
            require={[
               local.device.status,
               local.task.status
            ]}
         />
         <Address
            placeholder={ 'Device Address' }
            value={ local.device.value }
            update={ update }
            id={ 'device' }
         />
         <Address
            placeholder={ 'Task Address' }
            value={ local.task.value }
            update={ update }
            id={ 'task' }
         />
      </div>
   )
}

export default Device;