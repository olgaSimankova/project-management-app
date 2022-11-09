import React from 'react';
import { Box, Button, SvgIcon } from '@mui/material';
import { ReactComponent as AddUser } from '../../assets/icons/addUser.svg';
import { ReactComponent as Login } from '../../assets/icons/login.svg';

const Authentication = () => {
  return (
    <Box>
      <Button variant={'outlined'} sx={{ color: 'white' }}>
        <SvgIcon fontSize={'small'} sx={{ mr: 1 }}>
          <Login />
        </SvgIcon>
        Sign in
      </Button>
      <Button variant={'outlined'} sx={{ ml: 2, color: 'white' }}>
        <SvgIcon fontSize={'small'} sx={{ mr: 1 }}>
          <AddUser />
        </SvgIcon>
        Sign up
      </Button>
    </Box>
  );
};

export default Authentication;
