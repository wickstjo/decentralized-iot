import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { details } from '../contracts/user';
import { collection } from '../contracts/device';

import List from '../components/list';
import Links from '../components/links';

function User({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);
   
   // LOCAL STATES
   const [local, set_local] = useState({
      user: {},
      devices: [],
      found: false
   })

   // FETCH DETAILS
   useEffect(() => {

      // MAKE SURE QUERY IS AN ADDRESS
      if (state.web3.utils.isAddress(match.params.address)) {
         
         // FETCH DETAILS
         details(match.params.address, state).then(result => {
            if (result.success) {

               // USER DATA
               const user = result.data;

               // FETCH DEVICE COLLECTION
               collection(match.params.address, state).then(result => {
                  if (result.success) {

                     // ON SUCCESS
                     set_local({
                        ...local,
                        user: user,
                        devices: result.data,
                        found: true
                     })
                  
                  // ON ERROR
                  } else {
                     dispatch({
                        type: 'add-message',
                        payload: {
                           type: 'bad',
                           text: 'could not fetch devices'
                        }
                     })
                  }
               })

            // ON ERROR
            } else {
               dispatch({
                  type: 'add-message',
                  payload: {
                     type: 'bad',
                     text: 'could not fetch user data'
                  }
               })
            }
         })

      // OTHERWISE, LOG ERROR
      } else {

         // SEND MESSAGE
         dispatch({
            type: 'add-message',
            payload: {
               type: 'bad',
               text: 'not a valid address'
            }
         })
      }
   }, [])

   // RENDER CONTENT
   switch (local.found) {

      // USER FOUND
      case true: { return (
         <Fragment>
            <div>
               <List
                  header={ 'details' }
                  data={ local.user }
               />
            </div>
            <div>
               <Links
                  header={ 'owned devices' }
                  error={ 'No devices found' }
                  url={ 'http://localhost:3000/devices/' }
                  data={ local.devices }
               />
            </div>
         </Fragment>
      )}

      // OTHERWISE
      default: { return (
         <div>User was not found!</div>
      )}
   }
}

export default User;