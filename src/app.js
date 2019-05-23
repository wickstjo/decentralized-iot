import React from 'react';
import { Provider } from "./context";

import './interface/css/general.css';

import Header from './components/header.js';
import Content from  './components/content.js';
import Init from  './init.js';

function App() { return (
   <Provider>
      <Init />
      <Header />
      <Content />
   </Provider>
)}

export default App;