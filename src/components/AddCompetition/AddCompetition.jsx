import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { alpha } from '@material-ui/core/styles'



const AddCompetition = () =>{

    useEffect(()=>{
        dispatch({
            type: "FETCH_ALL_USERS"
        })
    },[])

    const [players, setPlayers] = useState([])
    const [competitionName, setCompetitionName] = useState('')
    const [value, setValue] = useState(new Date());
    const dispatch = useDispatch()
    const allUsers = useSelector((store) => store.allUsersReducer)
    const handleChange = (evt, value) => setPlayers(value)
    const handleClick = () => console.log(players)
    
   
    return (
        <div>
             <LocalizationProvider dateAdapter={AdapterLuxon}>
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
      />
      <MobileDatePicker
          label="For mobile"
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