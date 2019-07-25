import React, { useContext, useState } from 'react';
import { Context } from '../context';

import { fetch, add, details, accept, submit, release } from '../funcs/task';
import Button from '../components/button';

function Task() {

   // GLOBAL STATE 
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      expires: Date.now() + 100000,
      reputation: '',
      reward: '',
      encryption: '',
      task: '',
      device: '',
      ipfs: ''
   });

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         ...local,
         [event.target.id]: event.target.value
      })
   }

   // FETCH ALL TASKS
   const Fetch = () => {
      fetch(state).then(({ success, data }) => {
         if (success) {
            console.log(data);
         }
      })
   }

   // ADD TASK
   const Add = () => {
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
   const Details = () => {
      if (state.web3.utils.isAddress(local.task)) {
         details(local.task, state).then(({ success, data }) => {
            if (success) {
               console.log(data);
            }
         })
      } else { console.log('task is not an address') }
   }

   // ACCEPT TASK
   const Accept = () => {
      if (state.web3.utils.isAddress(local.task)) {
         accept(local.task, local.device, state).then(success => {
            if (success) {
               console.log('accepted task')
            }
         })
      } else { console.log('task and/or device are not addresses') }
   }

   // SUBMIT DATA TO TASK
   const Submit = () => {
      if (state.web3.utils.isAddress(local.task)) {
         submit(local.task, local.ipfs, state).then(success => {
            if (success) {
               console.log('data submitted')
            }
         })
      } else { console.log('task is not an address') }
   }

   // RELEASE TASK
   const Release = () => {
      if (state.web3.utils.isAddress(local.task)) {
         release(local.task, state).then(success => {
            if (success) {
               console.log('contract released')
            }
         })
      } else { console.log('task is not an address') }
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
         </div>
         <div>
            <input
               type={ 'text' }
               placeholder={ 'expiration date' }
               value={ local.expires }
               onChange={ update }
               id={ 'expires' }
            />
            <input
               type={ 'number' }
               placeholder={ 'required reputation' }
               value={ local.reputation }
               onChange={ update }
               id={ 'reputation' }
            />
            <input
               type={ 'text' }
               placeholder={ 'public encryption key' }
               value={ local.encryption }
               onChange={ update }
               id={ 'encryption' }
            />
            <input
               type={ 'number' }
               placeholder={ 'reward in wei' }
               value={ local.reward }
               onChange={ update }
               id={ 'reward' }
            />
         </div>
         <div>
            <Button
               header={ 'Details' }
               func={ Details }
            />
            <Button
               header={ 'Accept' }
               func={ Accept }
            />
            <Button
               header={ 'Submit' }
               func={ Submit }
            />
            <Button
               header={ 'Release' }
               func={ Release }
            />
         </div>
         <div>
            <input
               type={ 'text' }
               placeholder={ 'task contract' }
               value={ local.task }
               onChange={ update }
               id={ 'task' }
            />
            <input
               type={ 'text' }
               placeholder={ 'performing device' }
               value={ local.device }
               onChange={ update }
               id={ 'device' }
            />
            <input
               type={ 'text' }
               placeholder={ 'IPFS hash' }
               value={ local.ipfs }
               onChange={ update }
               id={ 'ipfs' }
            />
         </div>
      </div>
   )
}

export default Task;