import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { QUESTION_ON_DELETE } from '../../constants/constants';
import { useParams } from 'react-router-dom';
import { useDeleteColumnMutation, useUpdateColumnMutation } from '../../api/column.api';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

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
  name: string;
  columnId: string;
  order: number;
}

const ColumnHeader = ({ order, name, columnId }: ColumnHeaderProps) => {
  const { boardId } = useParams();
  const inputRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [columnName, setColumnName] = useState(name);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

  useEffect(() => {
    (inputRef.current?.firstElementChild as HTMLInputElement)?.focus();
  }, [isEdit]);

  const handleClick = () => {
    if (isEdit && boardId) {
      updateColumn({ title: columnName, boardId, columnId, order });
    }
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    if (boardId) {
      deleteColumn({ boardId, columnId });
    }
  };

  return (
    <StyledBoardItemHeader>
      <InputBase
        onChange={(e) => setColumnName(e.target.value)}
        color="secondary"
        value={columnName}
        ref={inputRef}
        sx={sxStyles}
        disabled={!isEdit}
      />
      <IconButton onClick={handleClick} size="medium" aria-label="edit">
        {isEdit ? (
          <CheckOutlinedIcon fontSize="small" color="success" />
        ) : (
          <EditIcon fontSize="small" />
        )}
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
