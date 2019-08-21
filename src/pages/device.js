import React, { useContext, useReducer, useEffect } from 'react';
import { Context } from '../context';

import { fetch, details, event } from '../contracts/device';
import { assess } from '../funcs/blockchain';
import { reducer, values } from '../states/device';

import List from '../components/list';
import Error from '../components/error';
import DeviceActions from '../components/actions/device';

function Device({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, values);

   // FETCH DETAILS
   useEffect(() => {

      // FETCH DEVICE CONTRACT
      fetch(match.params.hash, state).then(result => { assess({
         next: (location) => {

            // SET LOCATION
            set_local({
               type: 'location',
               payload: location
            })
      
            // FETCH DEVICE DETAILS
            details(location, state).then(result => { assess({
               next: (details) => {
            
                  // SET DETAILS
                  set_local({
                     type: 'details',
                     payload: details
                  })

                  // SUBSCRIBE TO STATUS TOGGLES
                  const toggles = event({
                     device: location,
                     name: 'Toggled',
                     action: (values) => {
                        
                        // SET STATUS
                        set_local({
                           type: 'toggle',
                           payload: values.status
                        })
                     }
                  }, state)

                  // UNSUBSCRIBE
                  return () => {
                     toggles.unsubscribe();
                  }
               }
            }, result, dispatch) })
         }
      }, result, dispatch) })
   }, [])

   // RENDER CONTENT
   switch (local.found) {

      // USER FOUND
      case true: { return (
         <div>
            <List
               header={ 'device details' }
               data={{
                  "name": local.details.name,
                  "owner": local.details.owner,
                  "address": local.location,
                  "enabled": local.details.status ? 'True' : 'False'
               }}
            />
            <DeviceActions location={ local.location } />
         </div>
      )}

      // OTHERWISE
      default: { return (
         <Error reason={ 'Device does not exist!' } />
      )}
   }
}

export default Device;