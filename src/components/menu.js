import React from 'react';
import { Link } from 'react-router-dom';
import Connect from './menu/connect';

function Menu() { return (
   <div id={ 'menu' }>
      <div>
      <Item
         to={ '/' }
         header={ 'Home' }
      />
      <Item
         to={ '/foo' }
         header={ 'Foo' }
      />
      </div>
      <div>
         <Connect />
      </div>
   </div>
)}

function Item({ header, to }) { return (
   <Link to={ to } className={ 'item' }>{ header }</Link>
)}

export default Menu;