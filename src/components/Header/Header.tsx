import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavLinks from '../NavLinks/NavLinks';
import { User } from '../User/User';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const Header = () => {
  return (
    <AppBar position={'sticky'} sx={{ background: '#063970' }}>
      <Toolbar sx={{ alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <AssignmentIcon />
          <Typography>Project Management App</Typography>
        </Box>
        <NavLinks />
        <User />
        <IconButton sx={{ ml: 2 }}>
          <DarkModeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
