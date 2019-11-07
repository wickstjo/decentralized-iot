import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { fetch_all } from '../contracts/user';
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
      console.log(state)
      fetch_all(state).then(result => {
         assess({
            next: (users) => {

               // SET STATE
               set_local(users)
            }
         }, result, dispatch)
      })
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