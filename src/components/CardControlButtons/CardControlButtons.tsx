import { Box, IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const CardControlButtons = () => {
  return (
    <Box sx={{ position: 'absolute', top: '0rem', right: '0.5rem' }}>
      <IconButton>
        <EditIcon color="info" />
      </IconButton>
      <IconButton>
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  );
};
