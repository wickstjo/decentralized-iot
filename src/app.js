import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, Context } from "./context";

import './interface/css/general.scss';

import Proxy from './proxy';
import Menu from './components/menu';
import Home from './pages/home';
import Administrate from './pages/administrate';
import Error from './pages/error';

import { init } from './funcs/blockchain';

function App() {

   // SETTIGNS
   const settings = {
      host: '127.0.0.1',
      blockchain: 8545,
      ipfs: 5001
   }
   
   return (
      <BrowserRouter>
         <Provider>
            <Content blockchain={ init(settings) } />
         </Provider>
      </BrowserRouter>
   )
}

// RENDER CONTENT CONDITIONALLY
function Content({ blockchain }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // UPDATE STATE
   useEffect(() => {
      dispatch({
         type: 'blockchain',
         payload: blockchain
      })
   }, [])

   // RENDER NORMAL CONTENT AFTER CONNECTING
   if (state.proxy !== undefined) {
      return <>
         <Proxy />
         <Menu />
         <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/administrate" component={ Administrate } />
            <Route component={ Error } />
         </Switch>
      </>

   // OTHERWISE, SHOW LOADING SCREEN
   } else { return <div>Establishing Connection...</div> };
}

export default App;