import { LoadingButton } from '@mui/lab';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CheckPasswordModalProps } from 'types/types';

export const CheckPasswordModal = ({
  onClickYes,
  onClickNo,
  isWrongPassword,
  isLoading,
}: CheckPasswordModalProps) => {
  const [password, setPassword] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        data-id="close"
        className="top-level"
        sx={{
          position: 'fixed',
          zIndex: 2,
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          background: '#333333',
          opacity: '0.5',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          zIndex: '3',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          minWidth: '300px',
          width: '30vw',
          padding: '1rem',
          background: 'white',
          borderRadius: '1rem',
        }}
      >
        <Typography variant="h5" color="primary.main">
          Enter your password:
        </Typography>
        <TextField
          onChange={handleChange}
          type="password"
          sx={{
            input: { color: 'primary.main' },
            border: '1px solid black',
            borderRadius: '0.2rem',
          }}
        />
        {isWrongPassword ? <Typography color="error">Wrong password!</Typography> : <></>}
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <LoadingButton loading={isLoading} onClick={() => onClickYes(password)}>
            Apply
          </LoadingButton>
          <Button onClick={onClickNo}>Cancel</Button>
        </Box>
      </Box>
    </Box>
  );
};
