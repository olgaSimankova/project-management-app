import { Box } from '@mui/material';
import React from 'react';
import { ITaskConfig } from 'types/types';
import Task from '../Task/Task';

interface TasksProps {
  tasks: ITaskConfig[];
}

export const TasksContainer = ({ tasks }: TasksProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
      {tasks.map((task) => (
        <Task id={task.taskId || ''} key={task._id} {...task} />
      ))}
    </Box>
  );
};
