import React, { useEffect } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NavLinks from '../NavLinks/NavLinks';
import { User } from '../User/User';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AuthButtons from '../AuthButtons/AuthButtons';
import { useAuth } from '../../hooks/useAuth';
import LanguageButton from 'components/LanguageButton/LanguageButton';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { setTheme } from 'theme/themeSlice';
import { useNavigate } from 'react-router-dom';
import { LINKS } from 'constants/constants';

export const Header = () => {
  const { theme } = useCustomTheme();
  const { token } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tokenLS = localStorage.getItem('credentials');

  useEffect(() => {
    if (token === '' && !tokenLS) {
      navigate(LINKS.welcome);
    }
  }, [navigate, token, tokenLS]);

  const handleThemeChange = () => {
    if (theme === 'light') {
      dispatch(setTheme('dark'));
      localStorage.setItem('theme', 'dark');
    } else {
      dispatch(setTheme('light'));
      localStorage.setItem('theme', 'light');
    }
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
