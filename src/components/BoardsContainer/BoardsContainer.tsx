import { Box, SelectChangeEvent } from '@mui/material';
import { useGetUsersQuery } from 'api/user.api';
import { BoardCard } from 'components/BoardCard/BoardCard';
import { Spinner } from 'components/Spinner/Spinner';
import {
  setBoardID,
  setModalOption,
  toggleConfirmationWindow,
  toggleModalWindow,
} from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { BoardFormOptions, BoardsContainerProps } from 'types/types';

export const BoardsContainer = ({
  isLoading,
  boards,
  isDeleting,
  isEditing,
  update,
}: BoardsContainerProps) => {
  const dispatch = useAppDispatch();
  const { data: users } = useGetUsersQuery();
  const [cards, setCards] = useState(boards);
  console.log(users);
  useEffect(() => {
    setCards(boards);
  }, [boards]);
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

  const onChangeAssignee = (event: SelectChangeEvent<string[]>, id: string) => {
    const {
      target: { value },
    } = event;
    setCards(
      cards.map((board) =>
        board._id === id
          ? {
              ...board,
              users: typeof value === 'string' ? value.split(',') : value,
            }
          : board
      )
    );
    dispatch(setBoardID(id));
  };
  const onCloseAssignee = (id: string) => {
    const updatedBoard = cards.find((board) => board._id === id);
    if (updatedBoard) {
      update(updatedBoard);
    }
  };
  return (
    <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', height: '100%' }}>
      {isLoading ? (
        <Spinner />
      ) : (
        cards.map((board) => (
          <BoardCard
            key={`${board._id}`}
            {...board}
            onClick={handleCardClick}
            isEditing={isEditing}
            isDeleting={isDeleting}
            onChangeAssignee={onChangeAssignee}
            onClose={onCloseAssignee}
            allUsers={users}
          />
        ))
      )}
    </Box>
  );
};
