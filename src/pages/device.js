import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
import { fetch } from '../contracts/device';

function Device({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      found: null,
      address: ''
   })

   // FETCH DETAILS
   useEffect(() => {
      fetch(match.params.hash, state).then(result => {
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
         <div>Device Found</div>
      )}

      // USER NOT FOUND
      case false: { return (
         <div>Device was NOT Found</div>
      )}

      // LOADING
      default: { return (
         <div>Loading..</div>
      )}
   }
}

export default Device;