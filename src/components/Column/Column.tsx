import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, List, Paper } from '@mui/material';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import Task from '../Task/Task';
import AddIcon from '@mui/icons-material/Add';
import { useGetTasksQuery } from '../../api/task.api';
import { IError, ITaskConfig } from '../../types/types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { LINKS } from 'constants/constants';

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
  padding: '10px',
  overflow: 'hidden',
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
  onDataReceived: (count: number) => void;
  onClick: (buttonId: string, columnId?: string) => void;
}

const Column = ({ id, boardId, name, order, onClick, onDataReceived }: IColumnProps) => {
  const { t } = useTranslation();
  const { data, isSuccess, isError, error } = useGetTasksQuery({
    boardId,
    columnId: id,
  });

  const handleButtonClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    onClick(target.id, id);
  };

  const tasks = data?.map((task: ITaskConfig) => (
    <Task
      key={task._id}
      id={task._id}
      boardId={boardId}
      columnId={id}
      title={task.title}
      order={task.order}
      description={task.description}
    />
  ));

  useEffect(() => {
    onDataReceived(tasks?.length || 0);
  }, [isSuccess, tasks?.length, onDataReceived]);

  if (isError) {
    toast.error((error as IError)?.data?.message || t('somethingWrong'));
  }

  return (
    <Box>
      <StyledBoardItem id={`${order}`} elevation={5}>
        <ColumnHeader order={order} name={name} columnId={id} />
        <Divider sx={dividerStyles} />
        <List sx={taskListStyle}>{tasks}</List>
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
    </Box>
  );
};

export default Column;
