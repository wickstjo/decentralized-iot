import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { all, event } from '../contracts/user';
import { assess } from '../funcs/blockchain';

import Links from '../components/links';
import UserForm from '../components/forms/user';

function Users() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState([])

   // FETCH ALL USERS
   useEffect(() => {
      all(state).then(result => {
         assess({
            next: (users) => {

               // SET STATE
               set_local(users)
            }
         }, result, dispatch)
      })

      // USER ADDED EVENT
      const added = event({
         name: 'Update',
         action: (values) => {

            // SET LOCAL
            set_local(values.users)
         }
      }, state);

      // UNSUBSCRIBE
      return () => {
         added.unsubscribe();
      }
   }, [])
   
   return (
      <Fragment>
         <div>
            <Links
               header={ 'registered users' }
               error={ 'No registered users' }
               url={ 'http://localhost:3000/users/' }
               data={ local }
            />
         </div>
         <div>
            <UserForm />
         </div>
      </Fragment>
   )
}

export default Users;