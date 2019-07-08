import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "./context";

import './interface/css/general.scss';

import Init from './init';
import Menu from './components/menu';
import Pages from './pages';

function App() { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <Menu />
         <Pages />
      </Provider>
   </BrowserRouter>
)}

export default App;