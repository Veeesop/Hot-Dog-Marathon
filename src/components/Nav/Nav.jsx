import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Paper, BottomNavigationAction, BottomNavigation } from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore' 
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArchiveIcon from '@mui/icons-material/Archive'
import { GiHotDog } from 'react-icons/gi'
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';

function Nav() {
  const user = useSelector((store) => store.user);
  const [value, setValue] = useState(0);
  return (
    <div className="nav">
      <div>
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {setValue(newValue);}}>
          <BottomNavigationAction component={Link} to="/user" label="Profile" icon={<PersonIcon />} />
          <BottomNavigationAction component={Link} to="/addHotdog" label="Add Dog" icon={<AddIcon />} />
          <BottomNavigationAction component={LogOutButton} label="Log Out" icon={<AddIcon />} />
          </BottomNavigation>
          </Paper>
          </>
        )}

        
      </div>
    </div>
  );
}

export default Nav;
