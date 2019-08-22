import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { reducer, values } from '../states/user';

import { fetch, details, results, event } from '../contracts/user';
import { assess } from '../funcs/blockchain';

import List from '../components/list';
import Inspector from '../components/inspector';
import Error from '../components/error';

function User({ match }) {

   // STATES
   const { state, dispatch } = useContext(Context);
   const [ local, set_local ] = useReducer(reducer, values);

   // FETCH DETAILS
   useEffect(() => {
      if (state.web3.utils.isAddress(match.params.address)) {

         // FETCH USER LOCATION
         fetch(match.params.address, state).then(result => { assess({
            next: (location) => {
         
               // FETCH USER DETAILS
               details(location, state).then(result => { assess({
                  next: (details) => {
               
                     // SET DETAILS
                     set_local({
                        type: 'details',
                        payload: details
                     })

                     // FETCH TASK RESULTS
                     results(location, state).then(result => { assess({
                        next: (results) => {

                           // SET RESULTS
                           set_local({
                              type: 'results',
                              payload: results
                           })

                           // TASK COMPLETED EVENT
                           const finished = event({
                              name: 'Finish',
                              location: location,
                              action: (values) => {

                                 // SET RESULTS
                                 set_local({
                                    type: 'results',
                                    payload: values.results
                                 })
                              }
                           }, state);

                           // UNSUBSCRIBE
                           return () => {
                              finished.unsubscribe();
                           }
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
               <Inspector
                  header={ 'task results' }
                  error={ 'No results found.' }
                  data={ local.results }
               />
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