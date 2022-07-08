import { Avatar, Typography  } from "@mui/material"

const HotDogDisplay = ({hotdog}) => {
    return (
        <div>
            <Avatar
                alt="HOT DOG"
                src={hotdog.photo}
                sx={{ width: 56, height: 56 }}
            />
            <Typography variant="body1"/>
        </div>
    )
}

export default HotDogDisplay