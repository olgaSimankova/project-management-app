import React from 'react';
import { Box } from '@mui/material';
import Tasks from '../Tasks/Tasks';

const boxStyles = {
  display: 'flex',
  width: '100%',
  flexWrap: 'nowrap',
  gap: '15px',
  overflow: 'auto',
  padding: '10px',
};

const TasksWrapper = () => {
  return (
    <Box sx={boxStyles}>
      <Tasks />
      <Tasks />
      <Tasks />
      <Tasks />
      <Tasks />
    </Box>
  );
};

export default TasksWrapper;
