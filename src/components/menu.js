import React from 'react';
import '../interface/css/menu.scss';

import Item from './menu/item';

function Menu() { return (
   <div id={ 'menu' }>
      <div>
         <Item
            to={ '/users' }
            header={ 'Users' }
         />
         <Item
            to={ '/tokens' }
            header={ 'Tokens' }
         />
         <Item
            to={ '/devices' }
            header={ 'Devices' }
         />
         <Item
            to={ '/tasks' }
            header={ 'Tasks' }
         />
      </div>
      <div>
         <Item
            to={ '/initialize' }
            header={ 'Initialize' }
         />
      </div>
   </div>
)}

export default Menu;