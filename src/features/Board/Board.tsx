import React from 'react';
import { Container } from '@mui/material';
import BoardHeader from '../../components/BoardHeader/BoardHeader';
import ColumnsWrapper from '../../components/ColumnsWrapper/ColumnsWrapper';

const Board = () => {
  return (
    <Container maxWidth="xl" sx={{ p: '0 10px' }}>
      <BoardHeader />
      <ColumnsWrapper />
    </Container>
  );
};

export default Board;
