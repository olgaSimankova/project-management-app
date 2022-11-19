import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Divider, List, Paper } from '@mui/material';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
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
}));

interface IColumnProps {
  id: string;
  order: number;
  onClick: (id: string) => void;
}

const Column = ({ id, order, onClick }: IColumnProps) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    onClick(target.id);
  };
  return (
    <StyledBoardItem id={`${order}`} elevation={5}>
      <ColumnHeader columnId={id} />
      <Divider sx={dividerStyles} />
      <List sx={{ p: '2px', overflowY: 'auto' }}>
        <Task />
        <Task />
        <Task />
        <Task />
      </List>
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
