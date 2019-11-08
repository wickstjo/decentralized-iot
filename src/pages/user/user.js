import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../context';

import { user_details } from '../../contracts/user';
import List from '../../components/list';

function User({ match }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [ local, set_local ] = useState({
      name: '',
      reputation: 0
   });

   // ON LOAD
   useEffect(() => {
      user_details(match.params.address, state).then(result => {
         set_local(result)
      })
   }, [])

   return (
      <div>
         <List
            header={ 'user details' }
            data={ local }
         />
      </div>
   )
}

export default User;