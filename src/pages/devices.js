import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { collection, event } from '../contracts/device';
import { assess } from '../funcs/blockchain';

import Links from '../components/links';
import DeviceForm from '../components/forms/device';

function Device() {

   // STATES
   const { state, dispatch } = useContext(Context);
   const [ local, set_local ] = useState([])

   // FETCH DETAILS
   useEffect(() => {
      collection(state.keys.public, state).then(result => { assess({
         next: (devices) => {
      
            // SET STATE
            set_local(devices)
         }
      }, result, dispatch) })

      // DEVICE ADDED EVENT
      const added = event({
         name: 'Update',
         action: (values) => {

            // IF ITS USER RELATED
            if (values.user.toLowerCase() === state.keys.public) {

               // SET BALANCE
               set_local(values.devices)
            }
         }
      }, state)

      // UNSUBSCRIBE
      return () => {
         added.unsubscribe();
      }
   }, [])

   return (
      <Fragment>
         <div>
            <Links
               header={ 'your devices' }
               error={ 'No devices found' }
               data={ local }
               url={ 'http://localhost:3000/devices/' }
            />
         </div>
         <div>
            <DeviceForm />
         </div>
      </Fragment>
   )
}

export default Device;