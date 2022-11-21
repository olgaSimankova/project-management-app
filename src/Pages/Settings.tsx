import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { EditableTextField } from 'components/EditableTextField/EditableTextField';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';

export const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [login, setLogin] = useState(user?.login || '');
  const [nameFlag, setNameFlag] = useState(true);
  const [loginFlag, setLoginFlag] = useState(true);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5">Edit your account</Typography>
        <EditableTextField defaultValue={name} isDisabled={nameFlag} />
        <EditableTextField defaultValue={login} isDisabled={loginFlag} />
        <Button>Change password</Button>
      </Box>
    </Box>
  );
};
