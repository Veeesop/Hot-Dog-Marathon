import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import * as React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
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
    const handleClick = () => {
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
             <LocalizationProvider dateAdapter={AdapterMoment}>
           <Stack spacing={2}>
            <TextField id='competition-name' placeholder="Competition Name" onChange={evt => setCompetitionName(evt.target.value)}/>
             <Autocomplete
             id='players'
        multiple
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
        rows={4}
        placeholder="Description"
        onChange={handleDescriptionChange}
      />
      <MobileDatePicker
          label="Pick An End Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      <Button variant="contained" onClick={handleClick}>START COMPETITION</Button>
      </Stack>
      </LocalizationProvider>
        </div>
       
    )
}

export default AddCompetition