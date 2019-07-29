import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { price, check, buy, transfer } from '../funcs/token';
import { input as reducer } from '../funcs/reducers';
import { keys } from '../resources/settings.json';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Number from '../components/inputs/number';

function Licence() {

   // GLOBAL STATE
   const { state } = useContext(Context);

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
      receiving: {
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
      price(state).then(({ success, data }) => {
         if (success) {
            console.log(data);
         }
      })
   }

   // CHECK CURRENT TOKEN BALANCE
   function Balance() {
      check(state).then(({ success, data }) => {
         if (success) {
            console.log(data);
         }
      })
   }

   // CHECK CURRENT TOKEN STATUS
   function Buy() {
      buy(local.amount, state).then(success => {
         if (success) {
            console.log('bought ' + local.amount + ' tokens')
         }
      })
   }

   // CHECK CURRENT TOKEN STATUS
   function Transfer() {
      transfer(local.amount, local.user, state).then(success => {
         if (success) {
            console.log('transferred ' + local.amount + ' tokens')
         }
      })
   }
   
   return (
      <div id={ 'innerbody' }>
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
               local.receiving.status
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
            placeholder={ 'Receiving Address' }
            value={ local.receiving.value }
            update={ update }
            id={ 'receiving' }
         />
      </div>
   )
}

export default Licence;