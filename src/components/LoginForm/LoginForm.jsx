import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import {TextField, Stack, Paper, Button, Typography} from '@mui/material';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>
    {errors.loginMessage && (
      <h3 className="alert" role="alert">
      {errors.loginMessage}
      </h3>
      )}
    <form onSubmit={login}>
      <Paper elevation={3} sx={{
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          mb: 40,
          width: 300,
          height: 300
      }}>
        
        <Stack spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <Typography variant='h4'>Log In</Typography>
          <TextField id="username" 
                type='text' 
                label="Username" 
                variant="outlined"
                value={username}
                required 
                onChange={(event) => setUsername(event.target.value)}/>
          <TextField id="password" 
                type='password' 
                label="Password" 
                variant="outlined"
                value={password}
                required 
                onChange={(event) => setPassword(event.target.value)}/>
          <Button sx={{
              m:1,
              bgcolor: "#ebcc34",
              '&:hover': {
                backgroundColor: "#f5eb7f"
              }
            }}  
            variant='contained' 
            type='submit'>
              Log In
              </Button>
        </Stack>
      </Paper>
     
    </form>
    </>
  );
}

export default LoginForm;
