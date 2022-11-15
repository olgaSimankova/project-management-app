import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Divider, List, Paper } from '@mui/material';
import TasksHeader from '../TasksHeader/TasksHeader';
import Task from '../Task/Task';
import AddIcon from '@mui/icons-material/Add';

const dividerStyles = {
  '&.MuiDivider-root': {
    borderColor: 'rgba(0, 0, 0, 0.42)',
    borderWidth: '1px',
  },
  marginTop: '5px',
};

const addButtonStyles = {
  '&.MuiButtonBase-root': {
    color: 'grey.500',
    border: '1px solid transparent',
    '&:hover': {
      color: 'grey.700',
      border: '1px solid #b3bac3',
    },
  },
  color: 'error',
  marginTop: '5px',
};

const StyledBoardItem = styled(Paper)(() => ({
  minWidth: '280px',
  maxHeight: '100%',
  marginTop: '20px',
  marginBottom: '20px',
  padding: '10px',
  overflow: 'hidden',
  borderRadius: '10px',
}));

const Tasks = () => {
  return (
    <StyledBoardItem elevation={5}>
      <TasksHeader />
      <Divider sx={dividerStyles} />
      <List sx={{ p: '2px', overflowY: 'auto' }}>
        <Task />
        <Task />
        <Task />
        <Task />
      </List>
      <Button sx={addButtonStyles} fullWidth={true} variant="text" startIcon={<AddIcon />}>
        Add task
      </Button>
    </StyledBoardItem>
  );
};

export default Tasks;
