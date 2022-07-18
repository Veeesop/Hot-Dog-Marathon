import { Paper, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import { GiHotDog, GiTrophyCup } from "react-icons/gi";
import { BsTrophyFill } from "react-icons/bs"
import moment from 'moment'

import '../CompDisplay/CompDisplay.css'

const currentTime = new Date(moment())




const CompDisplay = ({comps}) => {
    return (
        <Paper elevation={3} sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            margin: 3,
            padding:1.5,
            width: 330,
            backgroundColor: 'whitesmoke'
    }}>
        
        {comps.map((comp, index) => {
            return (
                <div key={index}>
                   
                {new Date(comp.end_date) > currentTime ? 
                <IconButton sx={{ color: "#65c456" }} className="iconButton" component={Link} to={`competition/${comp.id}`} >
                    <GiHotDog className="react-icons" aria-label={`${comp.name}`} />
                    <label className="comp-label">{comp.name}</label>
                </IconButton>
                :
                <IconButton sx={{ color: "#d6cb31" }} className="iconButton" component={Link} to={`competition/${comp.id}`} >
                    <GiTrophyCup className="react-icons" aria-label={`${comp.name}`} />
                    <label className="comp-label">{comp.name}</label>
                </IconButton>
                }
                </div>
            )
        })}
        </Paper>
    )
}
export default CompDisplay 