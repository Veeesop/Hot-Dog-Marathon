import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HotDogCardRight from "../HotDogCardRight/HotDogCartRight";
import HotDogCardLeft from "../HotDogCardLeft/HotDogCardLeft";
import Bounce from 'react-reveal/Bounce';
import { Box, Button, Avatar, Paper } from "@mui/material";
import Stack from "@mui/material/Stack"
import moment from "moment";
import "../HotDogComp/HotDogComp.css"
import CountDownMonths from "../CountDown/CountDown";
import React from 'react';


const HotDogComp = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const dateInFuture = new Date('2017-12-31');
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({
            type: "FETCH_ALL_COMP_DOGS",
            payload: id
        })
        dispatch({
            type: "FETCH_COMP_INFO",
            payload: id
        })
        dispatch({
            type: "FETCH_DOG_COUNT",
            payload: id
        })

    }, [])
    const dogs = useSelector(store => store.hotdogReducer)
    const user = useSelector(store => store.user)
    const comp = useSelector(store => store.activeComp)
    const dogCount= useSelector(store => store.dogCount)
    const date = `${moment(comp.end_date).format('YYYY-DD-MM')}`

    console.log(dogCount)
    return (
        <div className="hot-dog-comp-container">
            <img src="https://fontmeme.com/permalink/220714/b8b39ed9b7d039ac7f95a3727894e309.png" alt="hot-dog-font" border="0"/>
            <Box sx={{ width: 310,
                    boxShadow: 20,
                    margin: 3,
                    padding: 2
                    }}>
        <h2>{comp.name}</h2>
        <p>{comp.description}</p>
        <CountDownMonths date={comp.end_date} comp_id={comp.comp_id} leader={dogCount[0]} winner={comp.winner}/>
        {/* <h3>{moment(comp.end_date).format('MMMM DD,YYYY')}</h3> */}
        <div className="player-count">
        {dogCount.map((player)=>{
            return(
                <div className="player">
                <Avatar
                alt="Hot Dog Player"
                src={player.profile_image}
                sx={{ width: 56, height: 56 }}
                className="avatar"
                component={Paper}
                elevation={3}
              />
              <label className="count-label">{player.dog_count} dogs</label>
              <label className="count-label">{player.username}</label>
              </div>
            )
        })}
        </div>
        
        {user.id === comp.admin_user_id && <Button component={Link} to={`/susDogs/${comp.id}`}>Check Suspicious Dogs</Button>}
        </Box>
        <Box sx={{ width: 310,
                    boxShadow: 20,
                    margin: 3,
                    padding: 2
                    }}>
        <Stack spacing={2}>
        {dogs.map((dog) => {
            {if(user.id !== dog.user_id) {
                return(
                    <Bounce left key={dog.id}>
                        <HotDogCardLeft className="left" hotdog={dog} sx={{margin: 1}} key={dog.id}/>
                    </Bounce>
                    )
            } else {
                return (
                    <Bounce right key={dog.id}>
                        <HotDogCardRight className="right" hotdog={dog} sx={{margin: 1}} key={dog.id}/>
                    </Bounce>
                    )
            }
            } 
        })}
       </Stack>
       </Box>
        </div>
    )
}

export default HotDogComp;