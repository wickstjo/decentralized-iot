import React, { useContext, useState } from 'react';
import { Context } from '../context';
import { fetch, add, remove, status, toggle, task, assign } from '../funcs/device';

import Button from '../components/button';
import Address from '../components/inputs/address';
import Text from '../components/inputs/text';

function Device() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
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
         ...local,
         [id]: response
      })
   }

   // FETCH DEVICE ADDRESS
   function Fetch() {
      fetch(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // ADD DEVICE
   function Add() {
      add(state, local.name).then(success => {
         if (success) {
            console.log('device added')

            // RESET LOCAL NAME
            set_local({
               ...local,
               name: ''
            })
         }
      })
   }

   // REMOVE DEVICE
   function Remove() {
      remove(state).then(success => {
         if (success) {
            console.log('device removed')
         }
      })
   }

   // FETCH DEVICE ADDRESS
   function Status() {
      status(state, local.device).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // FETCH DEVICE ADDRESS
   function Toggle() {
      toggle(state, local.device).then(success => {
         if (success) {
            console.log('status toggled')
         }
      })
   }

   // FETCH DEVICE ADDRESS
   function Task() {
      task(state, local.device).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // FETCH DEVICE ADDRESS
   function Assign() {
      assign(state, local.device, local.task).then(success => {
         if (success) {
            console.log('task was assigned')
         }
      })
   }

   return (
      <div id={ 'innerbody' }>
         <Button
            header={ 'Fetch' }
            func={ Fetch }
         />
         <Button
            header={ 'Add' }
            func={ Add }
         />
         <Button
            header={ 'Remove' }
            func={ Remove }
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
         />
         <Button
            header={ 'Toggle' }
            func={ Toggle }
         />
         <Button
            header={ 'Current Task' }
            func={ Task }
         />
         <Button
            header={ 'Assign Task' }
            func={ Assign }
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