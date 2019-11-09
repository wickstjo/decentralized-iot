import React, { useContext } from 'react';
import { Context } from '../../context';

import { toggle_status } from '../../contracts/device';
import { assess } from '../../funcs/blockchain';

import Button from '../inputs/button';

function Device({ location }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // ADD DEVICE
   function Toggle() {
      toggle_status(location, state).then(result => {
         assess({
            msg: 'status toggled successfully'
         }, result, dispatch)
      })
   }

   return (
      <div style={{ textAlign: 'right' }}>
         <Button
            header={ 'toggle status' }
            func={ Toggle }
         />
      </div>
   )
}

export default Device;

