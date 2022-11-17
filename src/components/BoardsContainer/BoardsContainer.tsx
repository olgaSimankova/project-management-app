import { Box } from '@mui/material';
import { BoardCard } from 'components/BoardCard/BoardCard';
import React from 'react';
import { BoardsContainerProps } from 'types/types';

export const BoardsContainer = ({ boards }: BoardsContainerProps) => {
  return (
    <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {boards.map((board) => (
        <BoardCard key={`${board.title}${board.description}`} {...board} />
      ))}
    </Box>
  );
};
