import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { price, check, buy, transfer } from '../contracts/token';
import reducer from '../states/input';
import { keys } from '../resources/settings.json';
import { assess } from '../funcs/blockchain';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Number from '../components/inputs/number';

function Token() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      user: {
         value: keys.public,
         status: null
      },
      amount: {
         value: '',
         status: null
      },
      recipient: {
         value: '',
         status: null
      }
   })

   // SET USER INPUT
   function update(response, id) {
      set_local({
         type: 'field',
         payload: {
            name: id,
            value: response
         }
      })
   }

   // CHECK TOKEN PRICE
   function Price() {
      price(state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }

   // CHECK CURRENT TOKEN BALANCE
   function Balance() {
      check(local.user.value, state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }

   // CHECK CURRENT TOKEN STATUS
   function Buy() {
      buy(local.amount.value, state).then(result => {
         assess({
            msg: 'purchase successful'
         }, result, dispatch)
      })
   }

   // CHECK CURRENT TOKEN STATUS
   function Transfer() {
      transfer(local.amount.value, local.recipient.value, state).then(result => {
         assess({
            msg: 'transfer successful'
         }, result, dispatch)
      })
   }
   
   return (
      <div>
         <Button
            header={ 'Check Price' }
            func={ Price }
         />
         <Button
            header={ 'Balance' }
            func={ Balance }
            require={[ local.user.status ]}
         />
         <Button
            header={ 'Buy' }
            func={ Buy }
            require={[
               local.user.status,
               local.amount.status
            ]}
         />
         <Button
            header={ 'Transfer' }
            func={ Transfer }
            require={[
               local.user.status,
               local.amount.status,
               local.recipient.status
            ]}
         />
         <Address
            placeholder={ 'Your Address' }
            value={ local.user.value }
            update={ update }
            id={ 'user' }
         />
         <Number
            placeholder={ 'Amount of tokens' }
            value={ local.amount.value }
            range={[ 1, 100 ]}
            update={ update }
            id={ 'amount' }
         />
         <Address
            placeholder={ 'recipients Address' }
            value={ local.recipient.value }
            update={ update }
            id={ 'recipient' }
         />
      </div>
   )
}

export default Token;