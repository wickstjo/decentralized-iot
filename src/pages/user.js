import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { details } from '../contracts/user';
import { collection } from '../contracts/device';
import { assess } from '../funcs/blockchain';

import List from '../components/list';
import Links from '../components/links';
import ResultForm from '../components/forms/result';
import Error from '../components/error';

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
      if (state.web3.utils.isAddress(match.params.address)) {
         
         // FETCH USER DETAILS
         details(match.params.address, state).then(result => {
            assess({
               next: (user) => {
            
                  // FETCH DEVICE COLLECTION
                  collection(match.params.address, state).then(result => {
                     assess({
                        next: (devices) => {
                     
                           // SET STATE
                           set_local({
                              ...local,
                              user: user,
                              devices: devices,
                              found: true
                           })
                        }
                     }, result, dispatch)
                  })
               }
            }, result, dispatch)
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
               <Links
                  header={ 'owned devices' }
                  error={ 'No devices found' }
                  url={ 'http://localhost:3000/devices/' }
                  data={ local.devices }
               />
            </div>
            <div>
               <ResultForm user={ match.params.address } />
            </div>
         </Fragment>
      )}

      // OTHERWISE
      default: { return (
         <Error reason={ 'User does not exist!' } />
      )}
   }
}

export default User;