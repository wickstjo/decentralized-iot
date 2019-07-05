import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "./context";

import './interface/css/general.scss';

import Init from './init';
import Menu from './components/menu';

import User from './pages/user';
import Licence from './pages/licence';
import Device from './pages/device';
import Task from './pages/task';
import Error from './pages/error';

function App() { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <Menu />
         <Switch>
            <Route exact path="/user" component={ User } />
            <Route exact path="/licence" component={ Licence } />
            <Route exact path="/device" component={ Device } />
            <Route exact path="/task" component={ Task } />
            <Route component={ Error } />
         </Switch>
      </Provider>
   </BrowserRouter>
)}

export default App;