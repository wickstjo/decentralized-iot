import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../../context';

import { fetch_all } from '../../contracts/user';

import Links from '../../components/links';
import UserForm from '../../components/forms/user';

function Manager() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState([])

   // FETCH ALL USERS
   useEffect(() => {
      fetch_all(state).then(result => {
         set_local(result)
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   return (
      <Fragment>
         <div>
            <Links
               header={ 'registered users' }
               error={ 'No registered users' }
               section={ 'users' }
               data={ local }
            />
         </div>
         <div>
            <UserForm />
         </div>
      </Fragment>
   )
}

export default Manager;