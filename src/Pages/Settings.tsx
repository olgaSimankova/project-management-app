import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { EditableTextField } from 'components/EditableTextField/EditableTextField';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';

export const Settings = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState({
    name: user?.name || '',
    login: user?.login || '',
    password: '',
  });
  const [flags, setFlags] = useState({ name: true, login: true, password: true });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    switch (target?.dataset?.id) {
      case `edit-${tag}`:
        setFlags((flags) => ({ ...flags, [tag]: false }));
        break;
      case `done-${tag}`:
        setFlags((flags) => ({ ...flags, [tag]: true }));
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tag: string
  ) => {
    setCredits((credits) => ({ ...credits, [tag]: e.target.value }));
  };
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
        <EditableTextField
          defaultValue={credits.name}
          isDisabled={flags.name}
          handleClick={handleClick}
          handleChange={handleChange}
          tag="name"
        />
        <EditableTextField
          defaultValue={credits.login}
          isDisabled={flags.login}
          handleClick={handleClick}
          tag="login"
          handleChange={handleChange}
        />
        <EditableTextField
          defaultValue={credits.password}
          isDisabled={flags.password}
          handleClick={handleClick}
          tag="password"
          handleChange={handleChange}
        />
        <Button>Confirm changes</Button>
      </Box>
    </Box>
  );
};
