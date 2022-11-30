import React from 'react';
import { Grid } from '@mui/material';
import { ITaskProps } from '../../types/types';
import { Draggable } from 'react-beautiful-dnd';
import Task from '../Task/Task';

export const boxStyles = {
  '&.MuiBox-root': {
    boxShadow: '0 0 8px rgb(0 0 0 / 25%)',
  },
  width: '280px',
  marginTop: '10px',
  padding: '5px 5px 5px 10px',
  borderRadius: '7px',
  backgroundColor: 'white',
  wordBreak: 'break-all',
  cursor: 'pointer',
};

const TaskDnd = (props: ITaskProps) => {
  return (
    <Draggable draggableId={props.id || ''} index={props.order}>
      {(provided) => (
        <Grid {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Task {...props} />
        </Grid>
      )}
    </Draggable>
  );
};

export default TaskDnd;
