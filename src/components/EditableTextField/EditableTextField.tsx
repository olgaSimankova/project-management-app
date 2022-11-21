import { Box, TextField } from '@mui/material';
import React from 'react';
import { EditableTextFieldProps } from 'types/types';
import EditIcon from '@mui/icons-material/Edit';

export const EditableTextField = ({ defaultValue, isDisabled }: EditableTextFieldProps) => {
  return (
    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <TextField defaultValue={defaultValue} disabled={isDisabled} />
      <EditIcon color="info" />
    </Box>
  );
};
