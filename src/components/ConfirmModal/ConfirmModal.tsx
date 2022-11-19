import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { ConfirmModalProps } from 'types/types';

export const ConfirmModal = ({ question, onYesClick, onNoClick }: ConfirmModalProps) => {
  return (
    <Box>
      <Box
        data-id="close"
        className="top-level"
        sx={{
          position: 'fixed',
          zIndex: 1,
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
          top: '30vh',
          left: '36vw',
          zIndex: '2',
          flexDirection: 'column',
          gap: '3rem',
          alignItems: 'center',
          minWidth: '300px',
          width: '30vw',
          padding: '1rem',
          background: 'white',
          borderRadius: '1rem',
        }}
      >
        <Typography variant="h5">{question}</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button color="success" variant="contained" onClick={onYesClick}>
            YES
          </Button>
          <Button color="error" variant="contained" onClick={onNoClick}>
            NO
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
