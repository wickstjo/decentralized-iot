import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { fetch, add, remove, status, toggle, task, assign } from '../funcs/device';
import Button from '../components/button';

function Device() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: '',
      task: '',
      device: ''
   });

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         ...local,
         [event.target.id]: event.target.value
      })
   }
   
   // FETCH DEVICE ADDRESS
   const Fetch = () => {
      fetch(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // ADD DEVICE
   const Add = () => {
      if (local.name.length >= 3) {
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
      } else { console.log('name needs to be longer') }
   }

   // REMOVE DEVICE
   const Remove = () => {
      remove(state).then(success => {
         if (success) {
            console.log('device removed')
         }
      })
   }

   // FETCH DEVICE ADDRESS
   const Status = () => {
      if (state.web3.utils.isAddress(local.device)) {
         status(state, local.device).then(({ success, data }) => {
            if (success) {
               console.log(data)
            }
         })
      } else { console.log('device is not an address') }
   }

   // FETCH DEVICE ADDRESS
   const Toggle = () => {
      if (state.web3.utils.isAddress(local.device)) {
         toggle(state, local.device).then(success => {
            if (success) {
               console.log('status toggled')
            }
         })
      } else { console.log('device is not an address') }
   }

   // FETCH DEVICE ADDRESS
   const Task = () => {
      if (state.web3.utils.isAddress(local.device)) {
         task(state, local.device).then(({ success, data }) => {
            if (success) {
               console.log(data)
            }
         })
      } else { console.log('device is not an address') }
   }

   // FETCH DEVICE ADDRESS
   const Assign = () => {
      if (state.web3.utils.isAddress(local.device) && state.web3.utils.isAddress(local.task)) {
         assign(state, local.device, local.task).then(success => {
            if (success) {
               console.log('task was assigned')
            }
         })
      } else { console.log('task and/or device is not an address') }
   }

   return (
      <div id={ 'innerbody' }>
         <div>
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
         </div>
         <div>
            <input
               type={ 'text' }
               placeholder={ 'Device Name' }
               value={ local.name }
               onChange={ update }
               id={ 'name' }
            />
         </div>
         <div>
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
         </div>
         <div>
            <input
               type={ 'text' }
               placeholder={ 'Device Address' }
               value={ local.device }
               onChange={ update }
               id={ 'device' }
            />
         </div>
         <div>
            <input
               type={ 'text' }
               placeholder={ 'Task Address' }
               value={ local.task }
               onChange={ update }
               id={ 'task' }
            />
         </div>
      </div>
   )
}

export default Device;