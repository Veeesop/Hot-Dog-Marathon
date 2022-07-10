import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, TextField, Stack, Button, Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import 'date-fns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'

const AddCompetition = () =>{

    useEffect(()=>{
        dispatch({
            type: "FETCH_ALL_USERS"
        })
    },[])

    const [players, setPlayers] = useState([])
    const [competitionName, setCompetitionName] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(new Date());
    const dispatch = useDispatch()
    const allUsers = useSelector((store) => store.allUsersReducer)
    const user = useSelector((store) => store.user)
    const handleChange = (evt, value) => setPlayers(value)
    const handleDescriptionChange = (evt) => setDescription(evt.target.value)
    const handleSubmit = (evt) => {
        evt.preventDefault()
        dispatch({
            type: "ADD_NEW_COMPETITION",
            payload: toSend
        })
    }
    const toSend = {
        end_date: moment(value).format('YYYY-MM-DD'),
        name: competitionName,
        description: description,
        players: players,
        admin_user_id: user.id,
        admin_user_username: user.username
    }
    return (
        <div>
          <img src="https://fontmeme.com/permalink/220710/82b88f941d687d1cfc46f34fc954a8e0.png" alt="hot-dog-font" border="0"/>
          <form onSubmit={handleSubmit}>
             <LocalizationProvider dateAdapter={AdapterMoment}>
             <Paper elevation={3} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 3,
                padding:1.5,
                width: 330,
        }}>
          <Box sx={{
            width: 330
          }}>
           <Stack spacing={2}>
            <TextField id='competition-name' placeholder="Competition Name" required onChange={evt => setCompetitionName(evt.target.value)}/>
             <Autocomplete
                  id='players'
                  multiple
                  required
                  value={players}
                  options={allUsers}
                  onChange={handleChange}
                  getOptionLabel={(option) => option.username}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Competitors"
                      placeholder="Add Players"
                    />
                  )}
                />
                    <TextField
                      id='description'
                      multiline
                      required
                      rows={4}
                      placeholder="Description"
                      onChange={handleDescriptionChange}
                    />
                <MobileDatePicker
                    label="Pick An End Date"
                    required
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
      <Button variant="contained" type='submit'>START COMPETITION</Button>
      </Stack>
      </Box>
      </Paper>
      </LocalizationProvider>
      </form>
        </div>
       
    )
}

export default AddCompetition