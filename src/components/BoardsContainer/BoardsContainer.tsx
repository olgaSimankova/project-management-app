import { Box } from '@mui/material';
import { BoardCard } from 'components/BoardCard/BoardCard';
import {
  setCurrentBoardData,
  setModalOption,
  toggleConfirmationWindow,
  toggleModalWindow,
} from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React from 'react';
import { BoardFormOptions, BoardsContainerProps } from 'types/types';

export const BoardsContainer = ({ boards }: BoardsContainerProps) => {
  const dispatch = useAppDispatch();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    switch (target?.dataset.id) {
      case 'delete':
        dispatch(setCurrentBoardData(id));
        dispatch(toggleConfirmationWindow(true));
        break;
      case 'edit':
        dispatch(setModalOption(BoardFormOptions.edit));
        dispatch(toggleModalWindow(true));
        dispatch(setCurrentBoardData(id));
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
