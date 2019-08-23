import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Context } from './context';

import './interface/css/general.scss';
import './interface/css/innerbody.scss';
import './interface/css/input.scss';

// USERS
import Users from './pages/users';
import User from './pages/user';

// DEVICES
import Devices from './pages/devices';
import Device from './pages/device';

// TASKS
import Tasks from './pages/tasks';
import Task from './pages/task';

// OTHER
import Token from './pages/tokens';
import Initialize from './pages/initialize';
import Error from './pages/error';

function Pages() {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // IF WEB3 ISSET, RETURN NAVIGATION
    if (state.web3 !== undefined) {
        return (
            <div id={ 'innerbody' }>
                <Switch>
                    <Route exact path="/" component={() => <Redirect to={ '/users' } /> } />
                    <Route exact path="/users" component={ Users } />
                    <Route path="/users/:address" component={ User } />
                    <Route path="/tokens" component={ Token } />
                    <Route exact path="/devices" component={ Devices } />
                    <Route path="/devices/:hash" component={ Device } />
                    <Route exact path="/tasks" component={ Tasks } />
                    <Route path="/tasks/:address" component={ Task } />
                    <Route path="/initialize" component={ Initialize } />
                    <Route component={ Error } />
                </Switch>
            </div>
        )

    // OTHERWISE, SHOW LOADING
    } else { return <div>Loading</div> }
}

export default Pages;