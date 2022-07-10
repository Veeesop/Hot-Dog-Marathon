import { Paper, Typography, Avatar, Box } from "@mui/material"


const ProfileCard = ({user}) => {
    return (
        <Paper 
            elevation={5}
            sx={{ width: 370,
            display: "flex",
            direction: "column"
            }}>
            <Avatar
                alt={user.username}
                src={user.profile_image}
                sx={{ width: 180, 
                    height: 180, 
                    margin: 2}}/>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                direction: 'column',
                width: 140
                }}>
            <Typography variant="h6" sx={{ display: 'flex'}}>{user.username}</Typography>
            <Typography variant="body1" sx={{ width: 140,
                        display: "flex",
                        }}>{user.description}</Typography>
            </Box>
            
        </Paper>
    )
}

export default ProfileCard