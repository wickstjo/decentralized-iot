import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { collection } from '../contracts/device';
import { keys } from '../resources/settings.json';

import Links from '../components/links';
import DeviceForm from '../components/forms/device';

function Device() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState([])

   // FETCH DETAILS
   useEffect(() => {
      collection(keys.public, state).then(result => {
         if (result.success) {

            // ON SUCCESS
            set_local(result.data)
         
         } else {

            // ON ERROR
            dispatch({
               type: 'add-message',
               text: result.reason
            })
         }
      })
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