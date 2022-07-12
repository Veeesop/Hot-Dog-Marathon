import { Avatar, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from "@mui/material/Stack";

const HotDogCardRight = ({ hotdog }) => {

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 100,
        height: 100,
        border: `2px solid ${theme.palette.background.paper}`,
      }));
    
    return (
        <div key={hotdog.id}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
                badgeContent={
                    <SmallAvatar alt="Profile Photo" src={hotdog.profile_image} />
            }>
                <Avatar alt="Hot Dog" src={hotdog.photo} sx={{width: 300, height: 300}}/>
            </Badge>
        </div>
        
    )
}

export default HotDogCardRight