import { Box } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = () => {
  return (
    <>
      <Box
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
      ></Box>
      <CircularProgress
        color="info"
        sx={{
          position: 'fixed',
          zIndex: '2',
          top: '40%',
          left: '50%',
        }}
      />
    </>
  );
};
