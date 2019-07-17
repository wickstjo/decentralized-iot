import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';
import references from '../resources/latest.json';

import { initialize, price, check, buy, transfer } from '../funcs/token';
import Button from '../components/button';

function Licence() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      price: '',
      tasks: references.tasks.address,
      amount: '',
      user: ''
   });

   // INITIALIZE TOKEN CONTRACT
   const Initialize = () => {
      if (state.web3.utils.isAddress(local.tasks)) {
         initialize(local.price, local.tasks, state).then(success => {
            if (success) {
               console.log('tokens initialized')
            }
         })
      } else { console.log('tasks is not an address') }
   }

   // CHECK TOKEN PRICE
   const Price = () => {
      price(state).then(({ success, data }) => {
         if (success) {
            console.log(data);
         }
      })
   }

   // CHECK CURRENT TOKEN STATUS
   const Check = () => {
      check(state).then(({ success, data }) => {
         if (success) {
            console.log(data);
         }
      })
   }

   // CHECK CURRENT TOKEN STATUS
   const Buy = () => {
      buy(local.amount, state).then(success => {
         if (success) {
            console.log('bought ' + local.amount + ' tokens')
         }
      })
   }

   // CHECK CURRENT TOKEN STATUS
   const Transfer = () => {
      if (state.web3.utils.isAddress(local.user)) {
         transfer(local.amount, local.user, state).then(success => {
            if (success) {
               console.log('transferred ' + local.amount + ' tokens')
            }
         })
      } else { console.log('user is not an address') }
   }

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         ...local,
         [event.target.id]: event.target.value
      })
   }
   
   return (
      <div id={ 'innerbody' }>
         <div>
            <Button
               header={ 'Initialize' }
               func={ Initialize }
            />
         </div>
         <div>
            <input
               type={ 'number' }
               placeholder={ 'Token Price' }
               value={ local.price }
               onChange={ update }
               id={ 'price' }
            />
            <input
               type={ 'text' }
               placeholder={ 'Tasks Address' }
               value={ local.tasks }
               onChange={ update }
               id={ 'tasks' }
               min={ '1' }
               max={ '10' }
            />
         </div>
         <div>
            <Button
               header={ 'Price' }
               func={ Price }
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
               header={ 'Transfer' }
               func={ Transfer }
            />
         </div>
         <input
            type={ 'number' }
            placeholder={ 'How Many Tokens' }
            value={ local.amount }
            onChange={ update }
            id={ 'amount' }
            min={ '1' }
            max={ '10' }
         />
         <input
            type={ 'text' }
            placeholder={ 'User Address' }
            value={ local.user }
            onChange={ update }
            id={ 'user' }
         />
      </div>
   )
}

export default Licence;