import { Box } from '@mui/material';
import TaskDnd from 'components/TaskDnd/TaskDnd';
import React from 'react';
import { ITaskConfig } from 'types/types';

interface TasksProps {
  tasks: ITaskConfig[];
}

export const TasksContainer = ({ tasks }: TasksProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
      {tasks.map((task) => (
        <TaskDnd id={task.taskId || ''} key={task._id} {...task} />
      ))}
    </Box>
  );
};
