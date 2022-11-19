import { Box, SelectChangeEvent } from '@mui/material';
import { BoardCard } from 'components/BoardCard/BoardCard';
import { Spinner } from 'components/Spinner/Spinner';
import {
  setAssignees,
  setBoardID,
  setModalOption,
  toggleConfirmationWindow,
  toggleModalWindow,
} from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useMain } from 'hooks/useMain';
import React, { ReactNode } from 'react';
import { BoardFormOptions, BoardsContainerProps } from 'types/types';

export const BoardsContainer = ({
  isLoading,
  boards,
  isDeleting,
  isEditing,
}: BoardsContainerProps) => {
  const dispatch = useAppDispatch();
  const { assignees } = useMain();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    switch (target?.dataset.id) {
      case 'delete':
        dispatch(toggleConfirmationWindow(true));
        dispatch(setBoardID(id));
        break;
      case 'edit':
        dispatch(setModalOption(BoardFormOptions.edit));
        dispatch(toggleModalWindow(true));
        dispatch(setBoardID(id));
        break;
      default:
    }
  };

  const onChangeAssignee = (event: SelectChangeEvent<string[]>, child: ReactNode) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    dispatch(setAssignees(typeof value === 'string' ? value.split(',') : value));
  };
  return (
    <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', height: '100%' }}>
      {isLoading ? (
        <Spinner />
      ) : (
        boards.map((board) => (
          <BoardCard
            key={`${board._id}`}
            {...board}
            onClick={handleCardClick}
            isEditing={isEditing}
            isDeleting={isDeleting}
            onChangeAssignee={onChangeAssignee}
            assignees={assignees}
          />
        ))
      )}
    </Box>
  );
};
