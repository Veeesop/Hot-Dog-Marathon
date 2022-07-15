import { Avatar, Typography, Paper } from "@mui/material"
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment'
import Stack from "@mui/material/Stack";
import './HotDogEntry.css'

const HotDogEntry= ({ hotdog }) => {

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 100,
        height: 100,
        border: `2px solid ${theme.palette.background.paper}`,
      }));
    
      const data = moment(hotdog.time_added).format('llll')
    
    return (
        <div key={hotdog.id} className="left">
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: "left" }}
                badgeContent={
                    <div className="adornments-container">
                    <SmallAvatar alt="Profile Photo" src={hotdog.profile_image} />
                    <Chip icon={<AccessTimeIcon />} label={data} sx={{bgcolor: "#ebd234", ml: 7, mb: 12}}/>
                    </div>
            }>
                <Avatar component={Paper} elevation={5} alt="Hot Dog" src={hotdog.photo} sx={{width: 300, height: 300}}/>
            </Badge>
        </div>
        
    )
}

export default HotDogEntry