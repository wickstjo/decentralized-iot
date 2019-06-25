import React, { useContext } from 'react';
import { Context } from '../context';
import { price, duration, fetch, add, remove } from '../funcs/contracts/licences';

import Item from './item';

function Licences() {

   // GLOBAL STATE
   const { state } = useContext(Context);

    return (
        <div>
            <Item
                header={ 'Check Price' }
                func={() => {
                    price(state).then(response => {
                        console.log(response);
                    })
                }}
            />
            <Item
                header={ 'Check Duration' }
                func={() => {
                    duration(state).then(response => {
                        console.log(response);
                    })
                }}
            />
            <Item
                header={ 'Fetch Licence' }
                func={() => {
                    fetch(state, state.metamask.user).then(response => {
                        console.log(response)
                    })
                }}
            />
            <Item
                header={ 'Add Licence' }
                func={() => {
                    add(state, 1).then(() => {
                        console.log('successfully added licence');
                    })
                }}
            />
            <Item
                header={ 'Remove Licence' }
                func={() => {
                    remove(state).then(() => {
                        console.log('successfully removed licence');
                    })
                }}
            />
        </div>
    )
}

export default Licences;