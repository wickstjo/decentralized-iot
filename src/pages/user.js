import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
import { details } from '../contracts/user';

function User({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      found: null,
      data: {}
   })

   // FETCH DETAILS
   useEffect(() => {
      details(match.params.address, state).then(result => {
         if (result.success) {

            // ON SUCCESS
            set_local({
               found: true,
               data: result.data
            })
         } else {

            // ON ERROR
            set_local({
               ...local,
               found: false
            })
         }
      })
   }, [])

   // RENDER CONTENT
   switch (local.found) {

      // USER FOUND
      case true: { return (
         <Details data={ local.data } />
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

export default User;