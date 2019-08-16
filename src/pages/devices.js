import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { collection, event } from '../contracts/device';
import { keys } from '../resources/settings.json';
import { assess } from '../funcs/blockchain';

import Links from '../components/links';
import DeviceForm from '../components/forms/device';

function Device() {

   // STATES
   const { state, dispatch } = useContext(Context);
   const [ local, set_local ] = useState([])

   // FETCH DETAILS
   useEffect(() => {
      collection(keys.public, state).then(result => {
         assess({
            next: (devices) => {
         
               // SET STATE
               set_local(devices)
            }
         }, result, dispatch)
      })

      // DEVICE ADDED EVENT
      const addition = event(state);

      // SUBSCRIBE
      addition.on('data', event => {
         
         // DECONSTRUCT VALUES
         const { user, devices } = event.returnValues;

         // IF THE EVENT WAS USER RELATED
         if (user === keys.public) {

            // SET BALANCE
            set_local(devices)
         }
      })

      // UNSUBSCRIBE
      return () => {
         addition.unsubscribe();
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