import React, { useRef, useState } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const StyledBoardItemHeader = styled(Box)(() => ({
  display: 'flex',
  gap: '5px',
  height: '35px',
}));

const sxStyles = {
  '& .MuiInputBase-input': {
    height: '17px',
    padding: '5px',
    border: '1px solid transparent',
    '&:focus': {
      border: '1px solid #b1b1b1',
      borderRadius: '5px',
    },
  },
};

const TasksHeader = () => {
  const inputRef = useRef<HTMLDivElement>();
  const [itemName, setItemName] = useState('here will be title');

  const handleClick = () => {
    (inputRef.current?.firstElementChild as HTMLInputElement)?.focus();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    (inputRef.current?.firstElementChild as HTMLInputElement)?.blur();
  };

  return (
    <StyledBoardItemHeader component="form" onSubmit={(e) => handleSubmit(e)}>
      <InputBase
        onChange={(e) => setItemName(e.target.value)}
        color="secondary"
        value={itemName}
        ref={inputRef}
        sx={sxStyles}
      />
      <IconButton onClick={handleClick} size="medium" aria-label="edit">
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton size="medium" aria-label="delete">
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </StyledBoardItemHeader>
  );
};

export default TasksHeader;
