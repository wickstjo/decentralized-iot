import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { fetch_user, add_user, remove_user } from '../funcs/contract';
import Button from '../components/button';

function User() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local  ] = useState({
      name: 'foobar'
   });

   // FETCH USER
   const fetch = () => {
      fetch_user(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // ADD USER
   const add = () => {
      add_user(state, local.name).then(success => {
         if (success) {
            console.log('added user')
         }
      })
   }

   // REMOVE USER
   const remove = () => {
      remove_user(state).then(success => {
         if (success) {
            console.log('removed user')
         }
      })
   }
   
   return (
      <div id={ 'innerbody' }>
         <Button
            header={ 'Fetch User' }
            func={ fetch }
         />
         <Button
            header={ 'Add User' }
            func={ add }
         />
         <Button
            header={ 'Remove User' }
            func={ remove }
         />
      </div>
   )
}

export default User;