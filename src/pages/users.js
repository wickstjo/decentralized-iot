import React, { useContext, useReducer, useEffect } from 'react';
import { Context } from '../context';
import reducer from '../states/input';

import { collection } from '../contracts/user';

import Links from '../components/links';
import UserForm from '../components/forms/user';

function Users() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         status: null
      },
      collection: []
   })

   // FETCH ALL USERS
   useEffect(() => {
      collection(state).then(result => {
         if (result.success) {
            set_local({
               type: 'field',
               payload: {
                  name: 'collection',
                  value: result.data
               }
            })
         }
      })
   }, [])
   
   return (
      <div id={ 'split' }>
         <div>
            <Links
               header={ 'registered users' }
               error={ 'No registered users' }
               url={ 'http://localhost:3000/users/' }
               data={ local.collection }
            />
         </div>
         <div>
            <UserForm />
         </div>
      </div>
   )
}

export default Users;