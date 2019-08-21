import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { fetch, details, results } from '../contracts/user';
import { assess } from '../funcs/blockchain';

import List from '../components/list';
import Error from '../components/error';

function User({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);
   
   // LOCAL STATES
   const [local, set_local] = useState({
      details: {},
      found: false
   })

   // FETCH DETAILS
   useEffect(() => {
      if (state.web3.utils.isAddress(match.params.address)) {

         // FETCH USER LOCATION
         fetch(match.params.address, state).then(result => { assess({
            next: (location) => {
         
               // FETCH USER DETAILS
               details(location, state).then(result => { assess({
                  next: (details) => {
               
                     // SET STATE
                     set_local({
                        ...local,
                        details: details,
                        found: true
                     })

                     // FETCH TASK RESULTS
                     results(location, state).then(result => { assess({
                        next: (foo) => {
                     
                           console.log(foo)
                        }
                     }, result, dispatch) })
                  }
               }, result, dispatch) })
            }
         }, result, dispatch) })
      }
   }, [])

   // RENDER CONTENT
   switch (local.found) {

      // USER FOUND
      case true: { return (
         <Fragment>
            <div>
               <List
                  header={ 'user details' }
                  data={ local.details }
               />
            </div>
            <div>
               
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