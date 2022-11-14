import React from 'react';
import { Box, Button, SvgIcon } from '@mui/material';
import { ReactComponent as AddUser } from '../../assets/icons/addUser.svg';
import { ReactComponent as Login } from '../../assets/icons/login.svg';
import { NavLink } from 'react-router-dom';
import { LINKS } from '../../constants/constants';

const AuthButtons = () => {
  return (
    <Box ml="auto">
      <NavLink to={LINKS.signIn} end>
        <Button variant="outlined" sx={{ color: 'white' }}>
          <SvgIcon fontSize="small" sx={{ mr: 1 }}>
            <Login />
          </SvgIcon>
          Sign in
        </Button>
      </NavLink>

      <NavLink to={LINKS.signUp} end>
        <Button variant="outlined" sx={{ ml: 2, color: 'white' }}>
          <SvgIcon fontSize="small" sx={{ mr: 1 }}>
            <AddUser />
          </SvgIcon>
          Sign up
        </Button>
      </NavLink>
    </Box>
  );
};

export default AuthButtons;
