import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material'
import Zoom from 'react-reveal'
import hotdog from "../Loading/hotdog-1.1s-800px.png"
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="landing-container">
      <Zoom top>
      <img src="https://fontmeme.com/permalink/220714/b8b39ed9b7d039ac7f95a3727894e309.png" alt="hot-dog-font" border="0"/>
      </Zoom>
        <div className='button-container'>
          <Button sx={{
              m:1,
              bgcolor: "#ebcc34"
            }} 
          type="button"
          className='landing-button'
          variant='contained'
          onClick={() => {
            history.push('/login');
          }} >Log In</Button>
          <Button sx={{
            m:1,
            bgcolor: "#ebcc34"
          }}
          type="button"
          className='landing-button'
          variant='contained'
          onClick={() => {
            history.push('/registration');
          }} >Register</Button>
        </div>
        <Zoom bottom>
          <img src={hotdog} alt='hotdog'/>
        </Zoom>
        
    </div>
  );
}

export default LandingPage;
