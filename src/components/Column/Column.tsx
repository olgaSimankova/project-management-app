import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, List, Paper } from '@mui/material';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import Task from '../Task/Task';
import AddIcon from '@mui/icons-material/Add';
import { useGetTasksQuery } from '../../api/task.api';
import { Error, ErrorObject, ITaskConfig } from '../../types/types';
import { toast } from 'react-toastify';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addTasks } from '../../features/columnSlice';
import { INVALID_TOKEN, LINKS } from 'constants/constants';
import { logout } from 'features/authSlice';
import { useNavigate } from 'react-router-dom';

const dividerStyles = {
  '&.MuiDivider-root': {
    borderColor: 'rgba(0, 0, 0, 0.42)',
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
  marginTop: '5px',
  width: '290px',
  minHeight: '39px',
};

const StyledBoardItem = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '280px',
  maxHeight: '100%',
  padding: '15px 10px 10px',
  borderRadius: '10px',
  backgroundColor: '#eef2f9',
}));

const taskListStyle = {
  position: 'unset',
  minHeight: '1px',
  mb: '10px',
  p: '2px',
  display: 'flex',
  gridGap: '7px',
  gap: '7px',
  flexDirection: 'column',
  overflow: 'hidden auto',
};

interface IColumnProps {
  id: string;
  boardId?: string;
  name: string;
  order: number;
  onClick: (buttonId: string, columnId?: string) => void;
}

const Column = ({ id, boardId, name, order, onClick }: IColumnProps) => {
  const { data, isSuccess, isError, error } = useGetTasksQuery({
    boardId,
    columnId: id,
  });
  const { tasks } = useAppSelector((state) => state.boardState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(addTasks({ id, data }));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if ((error as ErrorObject)?.data?.message === INVALID_TOKEN) {
      navigate(LINKS.welcome);
      dispatch(logout());
    }
  }, [dispatch, navigate, error]);

  const handleButtonClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    onClick(target.id, id);
  };

  if (isError) {
    toast.error((error as Error).data.message);
  }

  return (
    <Box>
      <Draggable draggableId={id} index={order}>
        {(provided) => (
          <StyledBoardItem
            id={`${order}`}
            elevation={5}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <ColumnHeader order={order} name={name} columnId={id} />
            <Divider sx={dividerStyles} />
            <Droppable droppableId={id} type="task">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef} sx={taskListStyle}>
                  {!tasks[id]
                    ? null
                    : tasks[id].map((task: ITaskConfig, idx) => (
                        <Task
                          key={task._id}
                          id={task._id || ''}
                          boardId={boardId}
                          columnId={id}
                          title={task.title}
                          order={idx}
                          description={task.description}
                          users={task.users}
                        />
                      ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
            <Button
              id="add-task"
              onClick={handleButtonClick}
              sx={addButtonStyles}
              variant="text"
              startIcon={<AddIcon />}
            >
              Add task
            </Button>
          </StyledBoardItem>
        )}
      </Draggable>
    </Box>
  );
};

export default Column;
