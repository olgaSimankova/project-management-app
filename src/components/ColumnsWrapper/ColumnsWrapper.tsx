import React from 'react';
import { Box } from '@mui/material';
import Column from '../Column/Column';
import AddTasksButton from '../AddTasksButton/AddTasksButton';
import { useParams } from 'react-router-dom';
import { useGetColumnsQuery } from '../../api/column.api';
import { IColumn } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';

const boxStyles = {
  display: 'flex',
  width: '100%',
  flexWrap: 'nowrap',
  gap: '15px',
  overflow: 'auto',
  padding: '10px',
};

const ColumnsWrapper = () => {
  const { boardId } = useParams();
  const { data, isLoading } = useGetColumnsQuery(boardId as string);

  const columns = data?.map((column: IColumn) => <Column key={column._id} />);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={boxStyles}>
      {columns}
      <AddTasksButton />
    </Box>
  );
};

export default ColumnsWrapper;
