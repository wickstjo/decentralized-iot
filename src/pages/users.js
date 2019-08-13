import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { collection, event } from '../contracts/user';

import Links from '../components/links';
import UserForm from '../components/forms/user';

function Users() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState([])

   // FETCH ALL USERS
   useEffect(() => {
      collection(state).then(result => {
         if (result.success) {

            // ON SUCCESS
            set_local(result.data)
         
         } else {

            // ON ERROR
            dispatch({
               type: 'add-message',
               payload: {
                  type: 'bad',
                  text: 'could not fetch users'
               }
            })
         }
      })

      // USER ADDED EVENT
      const foo = event(state);

      // SUBSCRIBE
      foo.on('data', event => {
         set_local(event.returnValues.users)
      })

      // UNSUBSCRIBE
      return () => {
         foo.unsubscribe();
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