import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';

import User from './pages/user';
import Licence from './pages/licence';
import Device from './pages/device';
import Task from './pages/task';
import Error from './pages/error';

function Pages() {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // IF WEB3 ISSET, RETURN NAVIGATION
    if (state.web3 !== undefined) {
        return (
            <Switch>
                <Route exact path="/user" component={ User } />
                <Route exact path="/licence" component={ Licence } />
                <Route exact path="/device" component={ Device } />
                <Route exact path="/task" component={ Task } />
                <Route component={ Error } />
            </Switch>
        )

    // OTHERWISE, SHOW LOADING
    } else { return <div>Loading</div> }
}

export default Pages;