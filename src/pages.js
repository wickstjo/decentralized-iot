import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';

import './interface/css/general.scss';
import './interface/css/innerbody.scss';

import Home from './pages/home';
import User from './pages/user';
import Token from './pages/tokens';
import Device from './pages/device';
import Task from './pages/task';
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
                    <Route exact path="/user" component={ User } />
                    <Route exact path="/tokens" component={ Token } />
                    <Route exact path="/device" component={ Device } />
                    <Route exact path="/task" component={ Task } />
                    <Route exact path="/initialize" component={ Initialize } />
                    <Route component={ Error } />
                </Switch>
            </div>
        )

    // OTHERWISE, SHOW LOADING
    } else { return <div>Loading</div> }
}

export default Pages;