import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { price, duration, check, buy, remove } from '../funcs/licence';
import Button from '../components/button';

function Licence() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      amount: ''
   });

   // UPDATE LOCAL STATE
   const Price = () => {
      price(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // UPDATE LOCAL STATE
   const Duration = () => {
      duration(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // UPDATE LOCAL STATE
   const Check = () => {
      check(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // UPDATE LOCAL STATE
   const Buy = () => {
      buy(state, local.amount).then(success => {
         if (success) {

            // LOG SUCCESS
            console.log('licence added')

            // RESET LOCAL STATE
            set_local({
               amount: ''
            })
         }
      })
   }

   // UPDATE LOCAL STATE
   const Remove = () => {
      remove(state).then(success => {
         if (success) {
            console.log('licence removed')
         }
      })
   }

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         amount: event.target.value
      })
   }
   
   return (
      <div id={ 'innerbody' }>
         <div>
            <Button
               header={ 'Price' }
               func={ Price }
            />
            <Button
               header={ 'Duration' }
               func={ Duration }
            />
            <Button
               header={ 'Check' }
               func={ Check }
            />
            <Button
               header={ 'Buy' }
               func={ Buy }
            />
            <Button
               header={ 'Remove' }
               func={ Remove }
            />
         </div>
         <input
            type={ 'number' }
            placeholder={ 'How many months?' }
            value={ local.amount }
            onChange={ update }
            min={ '1' }
            max={ '5' }
         />
      </div>
   )
}

export default Licence;