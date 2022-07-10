import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@mui/material';
import ProfileCard from '../ProfileCard/ProfileCard';
import CompDisplay from '../CompDisplay/CompDisplay'

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
    <>
    <img src="https://fontmeme.com/permalink/220710/82b88f941d687d1cfc46f34fc954a8e0.png" alt="hot-dog-font" border="0"/>
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
   {userCompetitions.map((comp) => {
      return (
        <div key={comp.name} >
          <h2>{comp.name}</h2>
          <p>{comp.description}</p>
          <Link to={`competition/${comp.id}`}><Button variant='contained'>Go to Competition</Button></Link>
          {user.id === comp.admin_user_id && <Link to={`susdogs/${comp.id}`}><Button variant='contained'>Checkout Suspect Dogs</Button></Link>}
        </div>
      )
   })}
   </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
