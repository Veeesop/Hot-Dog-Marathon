import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';


function UserPage() {

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
   <h1>{user.username}</h1>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
