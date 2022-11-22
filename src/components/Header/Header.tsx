import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavLinks from '../NavLinks/NavLinks';
import { User } from '../User/User';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AuthButtons from '../AuthButtons/AuthButtons';
import { useAuth } from '../../hooks/useAuth';
import LanguageButton from 'components/LanguageButton/LanguageButton';
import { setTheme } from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useMain } from 'hooks/useMain';

export const Header = () => {
  const { theme } = useMain();
  const { token } = useAuth();
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    theme === 'light' ? dispatch(setTheme('dark')) : dispatch(setTheme('light'));
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: '1', background: '#063970' }}>
      <Toolbar sx={{ alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <AssignmentIcon />
          <Typography>Project Management App</Typography>
        </Box>
        {token ? (
          <>
            <NavLinks /> <User />
            <IconButton sx={{ ml: 2 }} onClick={handleThemeChange}>
              <DarkModeIcon />
            </IconButton>
          </>
        ) : (
          <AuthButtons />
        )}
        <LanguageButton />
      </Toolbar>
    </AppBar>
  );
};
