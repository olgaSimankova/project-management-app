import React, { useEffect } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import NavLinks from '../NavLinks/NavLinks';
import { User } from '../User/User';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AuthButtons from '../AuthButtons/AuthButtons';
import { useAuth } from '../../hooks/useAuth';
import LanguageButton from 'components/LanguageButton/LanguageButton';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { setTheme } from 'theme/themeSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LINKS } from 'constants/constants';
import { ReactComponent as Logo } from '../../assets/icons/PMALogo.svg';
import { Theme } from '@mui/system';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';

export const Header = () => {
  const { theme } = useCustomTheme();
  const { token } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tokenLS = localStorage.getItem('credentials');

  useEffect(() => {
    if (!token && !tokenLS) {
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

  const createStyles = (theme: Theme) => ({
    logoText: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
  });
  const { userTheme } = useUserSystemTheme();
  const styles = createStyles(userTheme);
  return (
    <AppBar position="sticky" sx={{ zIndex: '1', background: '#063970', p: 0 }}>
      <Toolbar sx={{ alignItems: 'center' }}>
        <Link to={LINKS.welcome} style={{ textDecoration: 'none', color: 'white' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Logo />
            <Typography sx={styles.logoText}>Task Manager</Typography>
          </Box>
        </Link>
        {token ? (
          <>
            <NavLinks /> <User />
            <IconButton sx={{ ml: 1 }} onClick={handleThemeChange}>
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
