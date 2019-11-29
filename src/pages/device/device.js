import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

import { device_overview, fetch_backlog } from '../../contracts/device';
import { filter } from '../../funcs/misc';

import List from '../../components/list';
import Links from '../../components/links';

function Device({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      details: {
         name: '',
         owner: '',
         contract: ''
      },
      assignments: []
   });

   // ON LOAD, FETCH DEVICE OVERVIEW & ASSIGNMENT BACKLOG
   useEffect(() => {
      device_overview(match.params.hash, state).then(details => {
         fetch_backlog(match.params.hash, state).then(assignments => {

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