import { Box } from '@mui/material';
import { useDeleteBoardMutation } from 'api/main.api';
import { BoardCard } from 'components/BoardCard/BoardCard';
import React from 'react';
import { BoardsContainerProps } from 'types/types';

export const BoardsContainer = ({ boards }: BoardsContainerProps) => {
  const [deleteBoard] = useDeleteBoardMutation();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    switch (target?.dataset.id) {
      case 'delete':
        deleteBoard(id);
        break;
      case 'edit':
        console.log('edit');
        break;
      default:
    }
  };
  return (
    <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {boards.map((board) => (
        <BoardCard key={`${board._id}`} {...board} onClick={handleCardClick} />
      ))}
    </Box>
  );
};
