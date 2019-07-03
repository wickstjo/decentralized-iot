import React, { useContext, useEffect } from 'react';
import { Context } from '../context';
import { fetch, add, remove, actions } from '../funcs/contracts/users';
import { reason } from '../funcs/blockchain';

import Item from './item';

function Users() {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // ADD & REMOVE EVENT LISTENERS
    useEffect(() => {
        //actions(state)
    }, []);

    return (
        <div>
            <Item
                header={ 'Fetch User' }
                func={() => {
                    fetch(state, state.user).then(response => {
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

export default Users;