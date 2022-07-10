import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HotDogCard from "../HotDogCard/HotDogCard";
import Bounce from 'react-reveal/Bounce';
import { Box } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating'
import Paper from "@mui/material/Paper";
import { GiHotDog } from 'react-icons/gi'
import Typography from "@mui/material/Typography";


const HotDogComp = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_COMP_DOGS",
            payload: id
        })
        dispatch({
            type: "FETCH_COMP_INFO",
            payload: id
        })
    }, [])
    const dogs = useSelector(store => store.hotdogReducer)
    const user = useSelector(store => store.user)
    const comp = useSelector(store => store.activeComp)
    
    return (
        <div>
            <Box sx={{ width: 340,
                    boxShadow: 20,
                    margin: 3,
                    padding: 3}}>
        <h2>{comp.name}</h2>
        <p>{comp.description}</p>
            </Box>
            <Box>
                <List>
                    {dogs.map((dog) => {
                        return(
                        <Bounce left>
                            <Paper elevation={15}>
                            <Box>
                            <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="Hot Dog" src={dog.photo} 
                                sx={{ width: 150, 
                                    height: 150,
                                    boxShadow: 20,
                                    margin: 3}} />
                            </ListItemAvatar>
                                <ListItemText primary={dog.username} 
                                    sx={{
                                    fontSize: 3,
                                    mb: 6 
                                    }}/>
                                <ListItemText primary={dog.description}/>
                                <ListItem>
                                <Rating 
                                    size='large'
                                    icon={<GiHotDog />}
                                    emptyIcon={<GiHotDog />}
                                    sx={{
                                    fontSize: "2rem"
                                    }}
                                    value={dog.rating}
                                />
                                </ListItem>
                        </ListItem>
                            </Box>
                        </Paper>
                        </Bounce>
                        )
                    })}
                </List>
            </Box>
        {/* {dogs.map((dog) => {
            return (
                <>
                <Bounce right>
                <HotDogCard hotdog={dog} key={dog.id}/>
                </Bounce>
                </>
            )
        })} */}
        </div>
    )
}

export default HotDogComp;