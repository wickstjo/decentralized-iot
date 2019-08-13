import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { reducer, values } from '../states/token';

import { price, check, event } from '../contracts/token';
import { keys } from '../resources/settings.json';

import TokenForm from '../components/forms/token';
import List from '../components/list';

function Tokens() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, values)

   // FETCH THE TOKEN PRICE & USER BALANCE
   useEffect(() => {
      price(state).then(result => {
         if (result.success) {

            // SET PRICE
            set_local({
               type: 'price',
               payload: result.data
            })

            check(keys.public, state).then(result => {
               if (result.success) {

                  // SET BALANCE
                  set_local({
                     type: 'balance',
                     payload: result.data
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

      // USER ADDED EVENT
      const foo = event(state);

      // SUBSCRIBE
      foo.on('data', event => {
         
         // DECONSTRUCT VALUES
         const { user, amount } = event.returnValues;

         // IF THE EVENT WAS USER RELATED
         if (user === keys.public) {

            // SET BALANCE
            set_local({
               type: 'balance',
               payload: amount
            })
         }
      })

      // UNSUBSCRIBE
      return () => {
         foo.unsubscribe();
      }
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