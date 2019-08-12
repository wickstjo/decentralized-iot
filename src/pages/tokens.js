import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../context';

import { price, check } from '../contracts/token';
import { keys } from '../resources/settings.json';

import TokenForm from '../components/forms/token';
import List from '../components/list';

function Tokens() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      price: 'Not Available',
      balance: 'Not Available'
   })

   // FETCH THE TOKEN PRICE & USER BALANCE
   useEffect(() => {
      price(state).then(result => {
         if (result.success) {

            // TOKEN PRICE
            const price = result.data;

            check(keys.public, state).then(result => {
               if (result.success) {
                  
                  // SET LOCAL STATE
                  set_local({
                     ...local,
                     price: price,
                     balance: result.data
                  })

               // OTHERWISE
               } else {
                  dispatch({
                     type: 'add-message',
                     payload: {
                        type: 'bad',
                        text: result.reason
                     }
                  })
               }
            })

         // OTHERWISE
         } else {
            dispatch({
               type: 'add-message',
               payload: {
                  type: 'bad',
                  text: result.reason
               }
            })
         }
      })
   }, [])

   return (
      <Fragment>
         <div>
            <List
               header={ 'token statistics' }
               data={{
                  "token price": local.price,
                  "your balance": local.balance
               }}
            />
         </div>
         <div>
            <TokenForm />
         </div>
      </Fragment>
   )
}

export default Tokens;