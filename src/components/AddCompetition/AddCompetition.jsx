import { useState, useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    }
  ];


const AddCompetition = () =>{

    useEffect(()=>{
        dispatch({
            type: "FETCH_ALL_USERS"
        })
    },[])

    const dispatch = useDispatch()
    const allUsers = useSelector((store) => store.allUsersReducer)
    const userNames = []
    
    allUsers.map((user) => {
        userNames.push(user.username)
    })
    console.log(allUsers)
    


   

    return (
        <Autocomplete
        multiple
        id="tags-outlined"
        options={allUsers}
        getOptionLabel={(option) => option.username}
        defaultValue={[allUsers[1]].username}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Competitors"
            placeholder="Add Players"
          />
        )}
      />
    )
}

export default AddCompetition;