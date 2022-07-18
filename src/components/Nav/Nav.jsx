import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Paper, BottomNavigationAction, BottomNavigation } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';

function Nav() {
  const dispatch = useDispatch()
  const history = useHistory()
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
          <BottomNavigationAction onClick={() => dispatch({ type: 'LOGOUT' })}label="Log Out" icon={<LogoutIcon />} />
          </BottomNavigation>
          </Paper>
          </>
        )}

        
      </div>
    </div>
  );
}

export default Nav;
