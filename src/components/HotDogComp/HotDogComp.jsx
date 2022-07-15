import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HotDogEntry from "../HotDogEntry/HotDogEntry";
import Bounce from 'react-reveal/Bounce';
import { Box, Button, Avatar, Paper } from "@mui/material";
import Stack from "@mui/material/Stack"
import moment from "moment";
import ScrollToTop from "react-scroll-to-top";
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
    const date = `${moment(comp.end_date).format('MMMM, DD, YYYY')}`
    return (
        <div className="hot-dog-comp-container">
            <img src="https://fontmeme.com/permalink/220714/b8b39ed9b7d039ac7f95a3727894e309.png" alt="hot-dog-font" border="0"/>
            <Box sx={{ width: 310,
                    boxShadow: 20,
                    margin: 3,
                    padding: 2
                    }}>
        <h2>{comp.name}</h2>
        <h3>Competition Admin: <span className="admin">{comp.admin_user_username}</span></h3>
        <h4>Competition End: {date}</h4>
        <p>{comp.description}</p>
        <CountDownMonths date={comp.end_date} comp_id={comp.id} leader={dogCount[0]} winner={comp.winner}/>
        {/* <h3>{moment(comp.end_date).format('MMMM DD,YYYY')}</h3> */}

       
        <div className="player-count" >
        {dogCount.map((player)=>{
            return(
                <div className="player" key={player.id}>
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
        {dogs.map((dog, index) => {
                return (
                    <Bounce right key={index}>
                        <HotDogEntry hotdog={dog} sx={{margin: 1}} key={dog.id}/>
                    </Bounce>
                    )
            })
        }
       </Stack>
       </Box>
    <ScrollToTop smooth/>
    </div>
    )
}

export default HotDogComp;