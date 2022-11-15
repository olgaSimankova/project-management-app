import React from 'react';
import { Container } from '@mui/material';
import BoardHeader from '../../components/BoardHeader/BoardHeader';
import TasksWrapper from '../../components/TasksWrapper/TasksWrapper';

const Board = () => {
  return (
    <Container maxWidth="xl" sx={{ p: '0 10px' }}>
      <BoardHeader />
      <TasksWrapper />
    </Container>
  );
};

export default Board;
