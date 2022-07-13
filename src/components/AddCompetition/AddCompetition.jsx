import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { Paper, TextField, Stack, Button, Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import 'date-fns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useHistory, Link } from "react-router-dom"
import '../AddCompetition/AddCompetition.css'

const AddCompetition = () =>{

    useEffect(()=>{
        dispatch({
            type: "FETCH_ALL_USERS"
        })
    },[])

    const [players, setPlayers] = useState([])
    const [competitionName, setCompetitionName] = useState('')
    const [description, setDescription] = useState('')
    const [valueDate, setValueDate] = useState(new Date());
    const [compAdded, setCompAdded] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
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
        setCompAdded(true)
    }
    const toSend = {
        end_date: moment(valueDate).format('YYYY-MM-DD'),
        name: competitionName,
        description: description,
        players: players,
        admin_user_id: user.id,
        admin_user_username: user.username
    }
    
    const fixedOptions = allUsers.filter(player => player.id === user.id)
    const [value, setValue] = React.useState([...fixedOptions]);

    console.log("fixedOptions", fixedOptions)
    
    return (
        <div className="add-hot-dog-container">
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
                  multiple
                  id="competition-users-selector"
                  value={players}
                  onChange={(event, newValue) => {
                    setPlayers([
                      ...fixedOptions,
                      ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                    ]);
                  }}
                  options={allUsers}
                  getOptionLabel={(option) => option.username}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option.username}
                        {...getTagProps({ index })}
                        disabled={fixedOptions.indexOf(option) !== -1}
                     />
                    ))
                  }
                  style={{ width: 330 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Fixed tag" placeholder="Players" />
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
                    value={valueDate}
                    onChange={(newValue) => {
                      setValueDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />      
      {!compAdded ? 
      <Button variant="contained" type='submit'>START COMPETITION</Button> :
      <Button variant="contained" color='success' component={Link} to='/user'>Back To Profile</Button>
    }
      </Stack>
      </Box>
      </Paper>
      </LocalizationProvider>
      </form>
        </div>
       
    )
}

export default AddCompetition