import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@mui/material';
import ProfileCard from '../ProfileCard/ProfileCard';
import CompDisplay from '../CompDisplay/CompDisplay'
import "./UserPage.css"

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
    <div className='user-container'>
    <img src="https://fontmeme.com/permalink/220714/b8b39ed9b7d039ac7f95a3727894e309.png" alt="hot-dog-font" border="0"/>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection='column'
    >
      <ProfileCard user={user}/>
      <Link to='/addCompetition'><Button sx={{margin: 3}} variant='contained'>Start A Competition!</Button></Link>
    </Box>
   <h2>My Competitions:</h2>
   <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection='column'
    >
      <CompDisplay comps={userCompetitions} />
  </Box>
   </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
