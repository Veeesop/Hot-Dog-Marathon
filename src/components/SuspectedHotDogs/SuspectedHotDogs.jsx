import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HotDogEntry from "../HotDogEntry/HotDogEntry";
import { Button, Box, Stack } from "@mui/material"
import Bounce from 'react-reveal/Bounce';
import './SuspectedHotDogs.css'


const SuspectedHotDogs = () => {
    const susDogs = useSelector(store => store.hotdogReducer)
    const comp = useSelector(store => store.activeComp)
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(()=>{
        dispatch({
            type: "FETCH_SUS_DOGS",
            payload: id
        })
        dispatch({
            type: "FETCH_COMP_INFO",
            payload: id
        })
    }, [])


    const handleDelete = (evt) => {
        console.log('delete:',evt.target.id)
        dispatch({
            type: "DELETE_DOG",
            payload: {
                dog: evt.target.id, 
                id: id
            }
            
        })
    }

    const handleApprove = (evt) => {
        dispatch({
            type: "APPROVE_DOG",
            payload: {
                dog: evt.target.id, 
                id: id
            }
        })
    }


    return (
        <div className="sus-dogs-container">
            <img src="https://fontmeme.com/permalink/220714/b8b39ed9b7d039ac7f95a3727894e309.png" alt="hot-dog-font" border="0"/>
            <Box sx={{ width: 310,
                    boxShadow: 20,
                    margin: 3,
                    padding: 2
                    }}>
        <h2>{comp.name}</h2>
        <p>{comp.description}</p>
        <h3>Check Suspect Dogs</h3>
        </Box>
        <Box sx={{ width: 310,
                    boxShadow: 20,
                    margin: 3,
                    padding: 2
                    }}>
        <Stack spacing={2}>
            {susDogs.map((dog) => {
                return (
                    <div key={dog.id}>
                        <Bounce right>
                            <HotDogEntry className="left" hotdog={dog} sx={{margin: 1}} key={dog.id}/>
                            {user.id === comp.admin_user_id && 
                                <div>
                                    <Button id={dog.id} onClick={handleDelete}>Delete</Button>
                                    <Button id={dog.id} onClick={handleApprove}>Approve</Button>
                                    <label className="percentage-label">%{dog.probability * 100} probability</label>
                                </div>}
                        </Bounce>
                    </div>
                    )
                })}
            </Stack>
       </Box>
    </div>
     
        
    )
}

export default SuspectedHotDogs