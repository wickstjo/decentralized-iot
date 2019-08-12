import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
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
import Home from './pages/home';
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
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/users" component={ Users } />
                    <Route exact path="/users/:address" component={ User } />
                    <Route exact path="/tokens" component={ Token } />
                    <Route exact path="/devices" component={ Devices } />
                    <Route exact path="/devices/:hash" component={ Device } />
                    <Route exact path="/tasks" component={ Tasks } />
                    <Route exact path="/tasks/:address" component={ Task } />
                    <Route exact path="/initialize" component={ Initialize } />
                    <Route component={ Error } />
                </Switch>
            </div>
        )

    // OTHERWISE, SHOW LOADING
    } else { return <div>Loading</div> }
}

export default Pages;