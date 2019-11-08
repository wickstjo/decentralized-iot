import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

import { device_overview } from '../../contracts/device';
import List from '../../components/list';

function Device({ match }) {

   // GLOBAL & LOCAL STATE
   const { state } = useContext(Context);
   const [local, set_local] = useState({
      name: '',
      owner: '',
      contract: '',
      active: false
   });

   // ON LOAD, FETCH DEVICE OVERVIEW
   useEffect(() => {
      device_overview(match.params.hash, state).then(result => {
         set_local(result)
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div>
         <List
            header={ 'device details' }
            data={ local }
         />
      </div>
   )
}

export default Device;