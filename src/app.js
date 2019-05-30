import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, Context } from "./context";

import './interface/css/general.scss';

import Init from './init';
import Metamask from './metamask';
import Menu from './components/menu';
import Home from './pages/home';
import Administrate from './pages/administrate';
import Error from './pages/error';

function App() { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <Content />
      </Provider>
   </BrowserRouter>
)}

function Content() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   if (state.proxy !== undefined) {
      return <>
         <Metamask />
         <Menu />
         <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/administrate" component={ Administrate } />
            <Route component={ Error } />
         </Switch>
      </>

   // OTHERWISE, RETURN NULL
   } else { return <div>Establishing Connection...</div> };
}

export default App;