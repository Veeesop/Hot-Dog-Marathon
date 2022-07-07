import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'


function UserPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type:"FETCH_USER_COMPETITIONS",
      payload: {
        id: user.id
      }
    })
  }, [])
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const userCompetitions = useSelector((store) => store.userCompetitions)
  return (
   <h1>{user.username}</h1>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
