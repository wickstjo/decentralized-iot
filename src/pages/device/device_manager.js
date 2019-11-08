import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../../context';

import { collection } from '../../contracts/device';

import Links from '../../components/links';
import DeviceForm from '../../components/forms/device';

function Device() {

   // STATES
   const { state } = useContext(Context);
   const [ local, set_local ] = useState([])

   // FETCH DETAILS
   useEffect(() => {
      collection(state).then(result => {
         set_local(result)
      })
   }, [])

   return (
      <Fragment>
         <div>
            <Links
               header={ 'your device collection' }
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