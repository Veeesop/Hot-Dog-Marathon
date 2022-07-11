import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HotDogCardRight from "../HotDogCardRight/HotDogCartRight";
import HotDogCardLeft from "../HotDogCardLeft/HotDogCardLeft";
import Bounce from 'react-reveal/Bounce';
import { Box, Button } from "@mui/material";
import Stack from "@mui/material/Stack"
import moment from "moment";
import "../HotDogComp/HotDogComp.css"
import DateCountdown from 'react-date-countdown-timer';
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
    const date = `${moment(comp.end_date).format('MMMM DD, YYYY')} 00:00:00 GMT+03:00`

    console.log(date)
    return (
        <div>
            <Box sx={{ width: 310,
                    boxShadow: 20,
                    margin: 3,
                    padding: 2
                    }}>
        <h2>{comp.name}</h2>
        <p>{comp.description}</p>
        <h3>{moment(comp.end_date).format('MMMM DD, YYYY')}</h3>
        {/* <DateCountdown dateTo='July 28, 2022 00:00:00 GMT+03:00'
callback={()=>alert('Hello')}  /> */}
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