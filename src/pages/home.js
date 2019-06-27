import React, { useContext } from 'react';
import { Context } from '../context';
import { network } from '../resources/settings.json';

import Users from '../components/users';
import Licences from '../components/licences';
import Devices from '../components/devices';
import Tasks from '../components/tasks';

function Home() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // RENDER BUTTONS IF USER IS ON THE CORRECT NETWORK
   if (state.network === network && state.user !== undefined) { return (

      <div id={ 'innerbody' }>
         <Users />
         <Licences />
         <Devices />
         <Tasks />
      </div>

   // OTHERWISE, SHOW ERROR MESSAGE
   )} else { return <div>You need to login and be on the correct network!</div> }
}

export default Home;