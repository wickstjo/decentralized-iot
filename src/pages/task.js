import React, { useContext, useState } from 'react';
import { Context } from '../context';
import { fetch, add, details, accept, submit, release } from '../funcs/task';

import Button from '../components/button';
import Address from '../components/inputs/address';
import Number from '../components/inputs/number';
import Text from '../components/inputs/text';

function Task() {

   // GLOBAL STATE 
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      expires: {
         value: '',
         status: false
      },
      reputation: {
         value: '',
         status: false
      },
      reward: {
         value: '',
         status: false
      },
      encryption: {
         value: '',
         status: false
      },
      task: {
         value: '',
         status: false
      },
      device: {
         value: '',
         status: false
      },
      ipfs: {
         value: '',
         status: false
      }
   });

   // SET USER INPUT
   function update(response, id) {
      set_local({
         ...local,
         [id]: response
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
         <Button
            header={ 'Fetch' }
            func={ Fetch }
         />
         <Button
            header={ 'Add' }
            func={ Add }
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