import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { check_price, check_duration, check_licence, buy_licence, remove_licence } from '../funcs/contract';
import Button from '../components/button';

function Licence() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      price: 0,
      licence: 0,
      checked: false,
      months: ''
   });

   // CHECK LICENCE PRISE & DURATION ON LOAD
   useEffect(() => {

      // STATE HAS NOT LOADED YET -- FIX

      check_price(state).then(({ success, data }) => {
         if (success) {
            const price = data;

            check_duration(state).then(({ success, data }) => {
               if (success) {
                  
                  // UPDATE LOCAL STATE
                  set_local({
                     ...local,
                     price: price,
                     duration: data,
                     checked: true
                  })
               }
            })
         }
      })
      
   }, [])

   // UPDATE LOCAL STATE
   const price = () => {
      check_price(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // UPDATE LOCAL STATE
   const duration = () => {
      check_duration(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // UPDATE LOCAL STATE
   const check = () => {
      check_licence(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // UPDATE LOCAL STATE
   const buy = () => {
      buy_licence(state, local.months).then(success => {
         if (success) {

            // LOG SUCCESS
            console.log('licence added')

            // RESET LOCAL STATE
            set_local({
               ...local,
               amount: ''
            })
         }
      })
   }

   // UPDATE LOCAL STATE
   const remove = () => {
      remove_licence(state).then(success => {
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
               func={ price }
            />
            <Button
               header={ 'Duration' }
               func={ duration }
            />
            <Button
               header={ 'Check' }
               func={ check }
            />
            <Button
               header={ 'Buy' }
               func={ buy }
            />
            <Button
               header={ 'Remove' }
               func={ remove }
            />
         </div>
         <input
            type={ 'number' }
            placeholder={ 'How many months?' }
            value={ local.months }
            onChange={ update }
            min={ '1' }
            max={ '5' }
         />
      </div>
   )
}

export default Licence;