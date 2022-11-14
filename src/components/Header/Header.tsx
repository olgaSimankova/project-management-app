import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavLinks from '../NavLinks/NavLinks';
import { User } from '../User/User';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AuthButtons from '../AuthButtons/AuthButtons';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { token } = useAuth();

  return (
    <AppBar position="sticky" sx={{ zIndex: '0', background: '#063970' }}>
      <Toolbar sx={{ alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <AssignmentIcon />
          <Typography>Project Management App</Typography>
        </Box>
        {token ? (
          <>
            <NavLinks /> <User />
            <IconButton sx={{ ml: 2 }}>
              <DarkModeIcon />
            </IconButton>
          </>
        ) : (
          <AuthButtons />
        )}
      </Toolbar>
    </AppBar>
  );
};
