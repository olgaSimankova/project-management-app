import React, { useRef, useState } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { QUESTION_ON_DELETE } from '../../constants/constants';
import { useParams } from 'react-router-dom';
import { useDeleteColumnMutation } from '../../api/column.api';

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

interface ColumnHeaderProps {
  columnId: string;
}

const ColumnHeader = ({ columnId }: ColumnHeaderProps) => {
  const inputRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('here will be title');
  const [deleteColumn] = useDeleteColumnMutation();
  const { boardId } = useParams();

  const handleClick = () => {
    (inputRef.current?.firstElementChild as HTMLInputElement)?.focus();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    (inputRef.current?.firstElementChild as HTMLInputElement)?.blur();
  };

  const handleDelete = () => {
    if (boardId) {
      deleteColumn({ boardId, columnId });
    }
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
      <IconButton onClick={() => setOpen(true)} size="medium" aria-label="delete">
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
      {open && (
        <ConfirmModal
          question={QUESTION_ON_DELETE}
          onYesClick={handleDelete}
          onNoClick={() => setOpen(false)}
        />
      )}
    </StyledBoardItemHeader>
  );
};

export default ColumnHeader;
