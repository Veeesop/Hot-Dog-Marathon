import { Avatar, Typography  } from "@mui/material"

const HotDogCard = ({hotdog}) => {
    return (
        <div>
            <Avatar
                alt="HOT DOG"
                src={hotdog.photo}
                sx={{ width: 150, 
                    height: 150,
                    boxShadow: 20,
                    margin: 3}}
            />
            <Typography variant="body1"/>
        </div>
    )
}

export default HotDogCard