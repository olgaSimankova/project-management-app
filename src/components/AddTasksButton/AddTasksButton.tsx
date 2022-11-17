import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTasksButtonStyles = {
  '&.MuiButtonBase-root': {
    color: 'grey.500',
    border: '1px dashed #b3bac3',
    '&:hover': {
      color: 'grey.700',
      border: '1px solid #b3bac3',
    },
  },
  marginTop: '20px',
  width: '290px',
  height: '39px',
};

const AddTasksButton = () => {
  return (
    <Button sx={AddTasksButtonStyles} variant="text" startIcon={<AddIcon />}>
      Add column
    </Button>
  );
};

export default AddTasksButton;
