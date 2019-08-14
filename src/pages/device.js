import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
import { fetch, details } from '../contracts/device';
import List from '../components/list';

function Device({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      found: false,
      data: {}
   })

   // FETCH DETAILS
   useEffect(() => {
      fetch(match.params.hash, state).then(result => {
         if (result.success) {
            
            // DEVICE ADDRESS
            const device = result.data;

            // FETCH DETAILS
            details(device, state).then(result => {
               
               // ON SUCCESS
               set_local({
                  found: true,
                  data: {
                     ...result.data,
                     address: device
                  }
               })
            })
         }
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
         <div>Device was NOT Found</div>
      )}
   }
}

export default Device;