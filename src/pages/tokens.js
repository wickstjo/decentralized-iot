import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import { reducer, values } from '../states/token';

import { price, balance, event } from '../contracts/token';
import { assess } from '../funcs/blockchain';

import TokenForm from '../components/forms/token';
import List from '../components/list';

function Tokens() {

   // STATES
   const { state, dispatch } = useContext(Context);
   const [ local, set_local ] = useReducer(reducer, values)

   // ON LOAD
   useEffect(() => {

      // FETCH TOKEN PRICE
      price(state).then(result => { assess({
         next: (price) => {

            // SET PRICE
            set_local({
               type: 'price',
               payload: price
            })
      
            // FETCH USER BALANCE
            balance(state.keys.public, state).then(result => { assess({
               next: (balance) => {
            
                  // SET BALANCE
                  set_local({
                     type: 'balance',
                     payload: balance
                  })
               }
            }, result, dispatch) })
         }
      }, result, dispatch) })

      // BALANCE CHANGE EVENT
      const changes = event({
         name: 'Update',
         action: (values) => {

            // IF ITS USER RELATED
            if (values.user === state.keys.public) {

               // RESET BALANCE
               set_local({
                  type: 'balance',
                  payload: values.amount
               })
            }
         }
      }, state);

      // UNSUBSCRIBE
      return () => {
         changes.unsubscribe();
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