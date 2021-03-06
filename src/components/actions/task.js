import React, { useContext } from 'react';
import { Context } from '../../context';

import { release_task, accept_task, submit_result } from '../../contracts/task';
import { assess } from '../../funcs/blockchain';

import Button from '../inputs/button';

function Task({ location }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // RELEASE TASK
   function release() {
      release_task(location, state).then(result => {
         assess({
            msg: 'task released successfully'
         }, result, dispatch)
      })
   }

   // ACCEPT TASK
   function accept() {

      // DEVICE HASH
      const device = 'cdbde0df13a59633a2a55ee9342d9b31650ae27c0a3c0d80bab4b1561f4df16e';

      accept_task(location, device, state).then(result => {
         assess({
            msg: 'task accepted successfully'
         }, result, dispatch)
      })
   }

   // SUBMIT TASK RESULT
   function submit() {

      // TEMP DATA
      const ipfs = 'qm-hash';
      const encryption = 'public-key';

      submit_result(location, ipfs, encryption, state).then(result => {
         assess({
            msg: 'result submitted successfully'
         }, result, dispatch)
      })
   }

   return (
      <div style={{ textAlign: 'right' }}>
         <Button
            header={ 'submit result' }
            func={ submit }
         />
         <Button
            header={ 'accept task' }
            func={ accept }
         />
         <Button
            header={ 'release task' }
            func={ release }
         />
      </div>
   )
}

export default Task;

