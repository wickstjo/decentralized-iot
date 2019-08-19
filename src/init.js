import { useEffect, useContext } from 'react';
import { Context } from './context';

import { init, call, assess } from './funcs/blockchain';

function Init() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // ON LOAD
   useEffect(() => {

      // GENERATE REFERENCES
      init().then(references => {

         // FETCH USER OWNER DEVICES
         call({
            query: references.contracts.devices.methods.collection(state.keys.public)
         }).then(result => {
            assess({
               next: (devices) => {

                  // FETCH USER POSTED TASKS
                  call({
                     query: references.contracts.tasks.methods.collection(state.keys.public)
                  }).then(result => {
                     assess({
                        next: (tasks) => {

                           // SET EVERYTHING
                           dispatch({
                              type: 'init',
                              payload: {
                                 ...references,
                                 devices: devices,
                                 tasks: tasks
                              }
                           })
                        }
                     }, result, dispatch)
                  })
               }
            }, result, dispatch)
         })
      })
   }, [])

   return null;
}

export default Init;