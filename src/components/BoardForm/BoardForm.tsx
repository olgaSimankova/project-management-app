import { Box, Button, TextareaAutosize, TextField, Typography } from '@mui/material';
import React from 'react';
import { BoardFormProps } from 'types/types';

export const BoardForm = ({ option }: BoardFormProps) => {
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
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          top: '30vh',
          left: '27vw',
          zIndex: '2',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          minWidth: '300px',
          width: '50vw',
          padding: '1rem',
          background: '#DDDDDD',
          borderRadius: '1rem',
        }}
      >
        <Typography variant="h5">
          {`${option.slice(0, 1).toUpperCase()}${option.slice(1)}`} project
        </Typography>
        <TextField id="board-title" label="Title" variant="outlined" sx={{ width: '80%' }} />
        <TextareaAutosize
          id="board-description"
          maxRows={6}
          minRows={6}
          placeholder="Description"
          aria-label="Description"
          style={{ width: '80%', background: '#DDDDDD' }}
        />
        <Button color="success" variant="contained">
          {option}
        </Button>
      </Box>
    </>
  );
};
