import React, { useContext } from 'react';
import { Context } from '../context';
import { fetch, add, remove } from '../funcs/contracts/users';

import Item from './item';

function Home() {

   // GLOBAL STATE
   const { state } = useContext(Context);

    return (
        <div>
            <Item
                header={ 'Fetch User' }
                func={() => {
                    fetch(state, state.metamask.user).then(response => {
                        console.log(response)
                    })
                }}
            />
            <Item
                header={ 'Add User' }
                func={() => {
                    add(state, 'foobar').then(() => {
                        console.log('user added successfully');
                    })
                }}
            />
            <Item
                header={ 'Remove User' }
                func={() => {
                    remove(state).then(() => {
                        console.log('user removed successfully');
                    })
                }}
            />
        </div>
    )
}

export default Home;