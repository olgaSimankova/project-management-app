import { Box, IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CardControlsButtonProps } from 'types/types';

export const CardControlButtons = ({ id, onClick }: CardControlsButtonProps) => {
  return (
    <Box
      onClick={(e) => onClick(e, id)}
      sx={{ position: 'absolute', top: '0rem', right: '0.5rem' }}
    >
      <IconButton className="top-level" data-id="edit">
        <EditIcon color="info" />
      </IconButton>
      <IconButton className="top-level" data-id="delete">
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  );
};
