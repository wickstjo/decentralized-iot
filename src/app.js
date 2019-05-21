import React from 'react';
import { Provider } from "./context";

import Header from './components/header.js';
import Buttons from  './components/buttons.js';
import Init from  './init.js';
import './interface/css/general.css';

function App() { return (
   <Provider>
      <Init />
      <Header />
      <Buttons />
   </Provider>
)}

export default App;