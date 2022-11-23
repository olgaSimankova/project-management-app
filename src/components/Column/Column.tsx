import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Divider, List, Paper } from '@mui/material';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import Task from '../Task/Task';
import AddIcon from '@mui/icons-material/Add';
import { useGetTasksQuery } from '../../api/task.api';
import { Error, ITaskConfig } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';

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
  height: '39px',
};

const StyledBoardItem = styled(Paper)(() => ({
  minWidth: '280px',
  maxHeight: '100%',
  marginTop: '20px',
  marginBottom: '20px',
  padding: '10px',
  overflow: 'hidden',
  borderRadius: '10px',
  backgroundColor: '#eef2f9',
}));

interface IColumnProps {
  id: string;
  boardId?: string;
  name: string;
  order: number;
  onClick: (id: string) => void;
}

const Column = ({ id, boardId, name, order, onClick }: IColumnProps) => {
  const { data, isLoading, isError, error } = useGetTasksQuery({ boardId, columnId: id });
  const handleButtonClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    onClick(target.id);
  };

  const tasks = data?.map((task: ITaskConfig) => (
    <Task key={task._id} title={task.title} description={task.description} />
  ));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    toast.error((error as Error).data.message);
  }

  return (
    <StyledBoardItem id={`${order}`} elevation={5}>
      <ColumnHeader order={order} name={name} columnId={id} />
      <Divider sx={dividerStyles} />
      <List sx={{ p: '2px', overflowY: 'auto' }}>{tasks}</List>
      <Button
        id="add-task"
        onClick={(e) => handleButtonClick(e)}
        sx={addButtonStyles}
        variant="text"
        startIcon={<AddIcon />}
      >
        Add task
      </Button>
    </StyledBoardItem>
  );
};

export default Column;
