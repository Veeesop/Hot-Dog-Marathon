import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {TextField, Stack, Paper, Button, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Loading from "../Loading/Loading"

const Input = styled('input')({
  display: 'none',
});

const quotes = [
  "Some people wanted champagne and caviar when they should have had beer and hot dogs. - Dwight D. Eisenhower",
  "Noblest of all dogs is the hot-dog; it feeds the hand that bites it. - Laurence J. Peter",
  "I need a little sugar in my bowl and a little hot dog in my roll. - Bessie Smith",
  "They say hot dogs can kill you. How do you know it's not the bun? - Jay Leno",
  "A hot dog at the game beats roast beef at the Ritz. - Humphrey Bogart",
  "Oh, I don't need sleep. I just went to my hotel room and had a cold hot dog and a vodka on the rocks. - Betty White",
  "Nobody, I mean nobody, puts ketchup on a hot dog. - Clint Eastwood",
  "Hot dogs always seem better out than at home; so do French-fried potatoes; so do your children. - Mignon McLaughlin",
  "In my house, a hot dog is a dog that's really hot. - Tilda Swinton",
  "Having no purpose is the function of art, so somebody else can look at it and ask a question. Design is different - you're supposed to understand what's going on. You can be delighted by it, intrigued by it, but you're supposed to know it's a hot dog stand. - Paula Scher",
  "You have to have a lot of respect for hot dogs. It's completely different from sandwich. First of all, the hot dog is American. Sandwiches are not American. They're different. Second of all, a hot dog is like a pop idol. Hot dogs are cute. It's a pop image - everyone knows what a hot dog is. - Takeru Kobayashi",
  "You can build an ordinary hot dog stand or you can build a spectacular one, and you can do it sometimes without that much difference in money - if somebody thinks about it. - Paula Scher",
  "Is the chemical aftertaste the reason why people eat hot dogs, or is it some kind of bonus? - Neil Gaiman"
]

const random = (array) => {
  return Math.floor(Math.random() * array.length)
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState(quotes[random(quotes)])
  const [profileImage, setProfileImage] = useState('')
  const [fileInputState, setFileInputState] = useState('')
  const [loading, setLoading] = useState(false)
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const imageInputChange = (evt) => {
    const file = evt.target.files[0];
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setProfileImage(reader.result)
      console.log(profileImage)
    }
  }

  const registerUser = (event) => {
    event.preventDefault();
    setLoading(true)
    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        description: description,
        profile_image: profileImage
      },
    });
  }; // end registerUser

  return (
    <>
    {loading ? <Loading /> :
    <form onSubmit={registerUser}>
          {errors.registrationMessage && (
            
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
        <Paper elevation={3} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 50,
          margin: 'auto',
          mb: 40,
          width: 300,
          height: 800
        }}>
          <Stack spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Typography variant='h4'>Register</Typography>
            <TextField id="username"
              type='text'
              label="Username"
              variant="outlined"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)} />
            <TextField id="password"
              type='password'
              label="Password"
              variant="outlined"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)} />
            <Avatar
              alt="Remy Sharp"
              src={profileImage}
              sx={{ width: 200, height: 200 }}
              />
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" display='none' value={fileInputState} onChange={imageInputChange}/>
              <Button sx={{
                m:1,
                bgcolor: "#ebcc34",
                '&:hover': {
                  backgroundColor: "#f5eb7f"
                }
              }} 
              variant="contained"  component="span">
                Profile Pic
              </Button>
            </label>
            <TextField
              id="outlined-multiline-static"
              label="About"
              multiline
              rows={4}
              defaultValue={description}
              onChange={(evt) => setDescription(evt.target.value)}
            />
            <Button sx={{
              m:1,
              bgcolor: "#ebcc34",
              '&:hover': {
                backgroundColor: "#f5eb7f"
              }
            }} 
              variant='contained' 
              type='submit'>
                Register
                </Button>
          </Stack>
        </Paper>
      </form>
    }
      </>
  );
}

export default RegisterForm;
