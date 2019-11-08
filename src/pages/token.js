import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { overview } from '../contracts/token';

import TokenForm from '../components/forms/token';
import List from '../components/list';

function Tokens() {

   // STATES
   const { state } = useContext(Context);
   const [ local, set_local ] = useState({
      price: 0,
      balance: 0
   })

   // ON LOAD
   useEffect(() => {
      overview(state).then(result => {
         set_local(result)
      })
   }, [])

   return (
      <Fragment>
         <div>
            <List
               header={ 'token statistics' }
               data={ local }
            />
         </div>
         <div>
            <TokenForm />
         </div>
      </Fragment>
   )
}

export default Tokens;