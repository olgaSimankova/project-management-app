import React, { useState } from 'react';
import { Box } from '@mui/material';
import Column from '../Column/Column';
import AddColumnButton from '../AddColumnButton/AddColumnButton';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../api/column.api';
import { IColumn } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import ColumnAddModal from '../ColumnAddModal/ColumnAddModal';

const boxStyles = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '15px',
  overflow: 'auto',
  padding: '10px',
};

const ColumnsWrapper = () => {
  const { boardId } = useParams();
  const { data, isLoading } = useGetColumnsQuery(boardId as string);

  const [open, setOpen] = useState(false);
  const [buttonId, setButtonId] = useState('');

  const handleClose = () => setOpen(false);
  const handleOpen = (id: string) => {
    setOpen(true);
    setButtonId(id);
  };

  const columns = data?.map((column: IColumn, idx) => (
    <Column
      key={column._id}
      boardId={boardId}
      id={column._id}
      order={idx}
      name={column.title}
      onClick={handleOpen}
    />
  ));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={boxStyles}>
      {columns}
      <AddColumnButton onClick={handleOpen} />
      <ColumnAddModal
        boardId={boardId}
        pressedButtonId={buttonId}
        open={open}
        columnsCount={columns?.length || 0}
        onClose={handleClose}
      />
    </Box>
  );
};

export default ColumnsWrapper;
