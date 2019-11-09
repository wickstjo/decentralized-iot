import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "./context";

import Init from './init';
import Menu from './components/menu';
import Pages from './pages';
import Messages from './components/messages';

function App() { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Menu />
            <Pages />
         </div>
         <Messages />
      </Provider>
   </BrowserRouter>
)}

export default App;