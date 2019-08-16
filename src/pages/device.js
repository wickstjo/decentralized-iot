import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';

import { fetch, details } from '../contracts/device';
import { assess } from '../funcs/blockchain';

import List from '../components/list';
import Error from '../components/error';

function Device({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      found: false,
      data: {}
   })

   // FETCH DETAILS
   useEffect(() => {

      // FETCH DEVICE CONTRACT
      fetch(match.params.hash, state).then(result => {
         assess({
            next: (device) => {
         
               // FETCH DEVICE DETAILS
               details(device, state).then(result => {
                  assess({
                     next: (details) => {
                  
                        // SET STATE
                        set_local({
                           found: true,
                           data: {
                              ...details,
                              address: device
                           }
                        })
                     }
                  }, result, dispatch)
               })
            }
         }, result, dispatch)
      })
   }, [])

   // RENDER CONTENT
   switch (local.found) {

      // USER FOUND
      case true: { return (
         <div>
            <List
               header={ 'device details' }
               data={{
                  "name": local.data.name,
                  "owner": local.data.owner,
                  "address": local.data.address,
                  "enabled": local.data.status ? 'True' : 'False'
               }}
            />
         </div>
      )}

      // OTHERWISE
      default: { return (
         <Error reason={ 'Device does not exist!' } />
      )}
   }
}

export default Device;