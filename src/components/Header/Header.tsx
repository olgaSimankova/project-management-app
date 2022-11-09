import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavLinks from '../NavLinks/NavLinks';
import Authentication from '../Authentication/Authentication';

export const Header = () => {
  return (
    <AppBar position={'sticky'} sx={{ background: '#063970' }}>
      <Toolbar sx={{ alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <AssignmentIcon />
          <Typography>Project Management App</Typography>
        </Box>
        <NavLinks />
        <Authentication />
      </Toolbar>
    </AppBar>
  );
};
