import { Paper, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import { GiHotDog } from "react-icons/gi";

import '../CompDisplay/CompDisplay.css'




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
    }}>
        {comps.map((comp) => {
            return (
                <IconButton className="iconButton" key={`${comp.name}`} component={Link} to={`competition/${comp.id}`} >
                    <GiHotDog className="react-icons" aria-label={`${comp.name}`} />
                    <label className="comp-label">{comp.name}</label>
                </IconButton>
            )
        })}
        </Paper>
    )
}
export default CompDisplay 