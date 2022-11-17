import React from 'react';
import { Box } from '@mui/material';
import Column from '../Column/Column';
import AddTasksButton from '../AddTasksButton/AddTasksButton';

const boxStyles = {
  display: 'flex',
  width: '100%',
  flexWrap: 'nowrap',
  gap: '15px',
  overflow: 'auto',
  padding: '10px',
};

const ColumnsWrapper = () => {
  return (
    <Box sx={boxStyles}>
      <Column />
      <Column />
      <AddTasksButton />
    </Box>
  );
};

export default ColumnsWrapper;
