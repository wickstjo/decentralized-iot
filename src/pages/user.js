import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { values, reducer } from '../states/user';

import { details } from '../contracts/user';
import { collection } from '../contracts/device';

import List from '../components/list';

function User({ match }) {

   // GLOBAL & LOCAL STATES
   const { state, dispatch } = useContext(Context);
   const [local, set_local] = useReducer(reducer, values);

   // FETCH DETAILS
   useEffect(() => {

      // MAKE SURE QUERY IS AN ADDRESS
      if (state.web3.utils.isAddress(match.params.address)) {
         
         // FETCH DETAILS
         details(match.params.address, state).then(result => {
            if (result.success) {

               // ON SUCCESS
               set_local({
                  type: 'user',
                  payload: result.data
               })

               // FETCH DEVICE COLLECTION
               collection(match.params.address, state).then(result => {
                  if (result.success) {

                     // ON SUCCESS
                     set_local({
                        type: 'collection',
                        payload: result.data
                     })
                  
                  // ON ERROR
                  } else { set_local({ type: 'failure' }) }
               })

            // ON ERROR
            } else { set_local({ type: 'failure' }) }
         })

      // OTHERWISE, LOG ERROR
      } else {

         // SET LOCAL STATE
         set_local({ type: 'failure' })

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
            <Details data={ local.user } />
            <List
               header={ 'Your Devices' }
               error={ 'No devices found' }
               url={ 'http://localhost:3000/devices/' }
               data={ local.collection }
            />
         </Fragment>
      )}

      // USER NOT FOUND
      case false: { return (
         <div>User was not found!</div>
      )}

      // LOADING
      default: { return (
         <div>Loading..</div>
      )}
   }
}

// PRESENT USER DETAILS
function Details({ data }) { return (
   <div>
      <div>Name: { data.name }</div>
      <div>Reputation: { data.reputation }</div>
      <div>Joined: { data.joined }</div>
   </div>
)}

// PRESENT DEVICES
function Devices({ data }) {
   switch(data.length) {

      // NO DEVICES
      case 0: { return (
         <div>No registered devices found</div>
      )}

      // LIST DEVICES
      default: { return (
         data.map((hash, index) => 
            <div key={ index }>{ hash }</div>
         )
      )}
   }
}

export default User;