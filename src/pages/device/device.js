import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

import { device_overview, device_assignments } from '../../contracts/device';
import { filter } from '../../funcs/misc';

import List from '../../components/list';
import Links from '../../components/links';
import DeviceActions from '../../components/actions/device';

function Device({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      details: {
         name: '',
         owner: '',
         contract: '',
         active: false
      },
      assignments: []
   });

   // ON LOAD, FETCH DEVICE OVERVIEW & ASSIGNMENT BACKLOG
   useEffect(() => {
      device_overview(match.params.hash, state).then(details => {
         device_assignments(match.params.hash, state).then(assignments => {

            // SET BOTH
            set_local({
               details: details,
               assignments: filter(assignments)
            })
         })
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div>
         <List
            header={ 'device details' }
            data={ local.details }
         />
         <DeviceActions
            location={ match.params.hash }
         />
         <Links
            header={ 'assignment backlog' }
            error={ 'No tasks found' }
            data={ local.assignments }
            section={ '../tasks' }
         />
      </div>
   )
}

export default Device;