import React from 'react';
import { Box, Button, SvgIcon } from '@mui/material';
import { ReactComponent as AddUser } from '../../assets/icons/addUser.svg';
import { ReactComponent as Login } from '../../assets/icons/login.svg';
import { NavLink } from 'react-router-dom';
import { LINKS } from '../../constants/constants';
import { useTranslation } from 'react-i18next';

const AuthButtons = () => {
  const { t } = useTranslation();

  return (
    <Box ml="auto">
      <NavLink to={LINKS.signIn} end>
        <Button variant="outlined" sx={{ color: 'white' }}>
          <SvgIcon fontSize="small" sx={{ mr: 1 }}>
            <Login />
          </SvgIcon>
          {t('signIn')}
        </Button>
      </NavLink>

      <NavLink to={LINKS.signUp} end>
        <Button variant="outlined" sx={{ ml: 2, color: 'white' }}>
          <SvgIcon fontSize="small" sx={{ mr: 1 }}>
            <AddUser />
          </SvgIcon>
          {t('signUp')}
        </Button>
      </NavLink>
    </Box>
  );
};

export default AuthButtons;
