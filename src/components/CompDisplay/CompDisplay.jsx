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
            backgroundColor: 'whitesmoke'
    }}>
        {comps.map((comp, index) => {
            return (
                <div key={index}>
                {!comp.winner ? 
                <IconButton className="iconButton" key={`${comp.name}`} component={Link} to={`competition/${comp.id}`} >
                    <GiHotDog className="react-icons" aria-label={`${comp.name}`} />
                    <label className="comp-label">{comp.name}</label>
                </IconButton>
                :
                <h1>this test</h1>
                }
                </div>
            )
        })}
        </Paper>
    )
}
export default CompDisplay 