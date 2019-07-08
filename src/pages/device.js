import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { fetch, add, remove, status, toggle } from '../funcs/device';
import Button from '../components/button';

function Device() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: ''
   });
   
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
      add(state, local.name).then(success => {
         if (success) {
            console.log('device added')
         }
      })
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
      status(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // FETCH DEVICE ADDRESS
   const Toggle = () => {
      toggle(state).then(success => {
         if (success) {
            console.log('status toggled')
         }
      })
   }

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         name: event.target.value
      })
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
            <Button
               header={ 'Status' }
               func={ Status }
            />
            <Button
               header={ 'Toggle' }
               func={ Toggle }
            />
         </div>
         <input
            type={ 'text' }
            placeholder={ 'Device Name' }
            value={ local.name }
            onChange={ update }
         />
      </div>
   )
}

export default Device;