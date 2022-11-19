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
  width: '100%',
  flexWrap: 'nowrap',
  gap: '15px',
  overflow: 'auto',
  padding: '10px',
};

const ColumnsWrapper = () => {
  const [open, setOpen] = useState(false);
  const { boardId } = useParams();
  const { data, isLoading } = useGetColumnsQuery(boardId as string);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const columns = data?.map((column: IColumn) => <Column key={column._id} />);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={boxStyles}>
      {columns}
      <AddColumnButton onClick={handleOpen} />
      <ColumnAddModal open={open} onClose={handleClose} />
    </Box>
  );
};

export default ColumnsWrapper;
