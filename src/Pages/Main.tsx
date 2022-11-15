import { Box, Button, Typography } from '@mui/material';
import { useCreateBoardMutation, useGetBoardsMutation } from 'api/main.api';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { setModalOption, toggleModalWindow } from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { useMain } from 'hooks/useMain';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { BoardFormOptions } from 'types/types';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAuth();
  const { isModalOpen, modalOption, boards } = useMain();
  const [getBoards] = useGetBoardsMutation();
  const [createBoard] = useCreateBoardMutation();

  useEffect(() => {
    if (token) {
      getBoards({});
    }
  }, [token]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setModalOption(BoardFormOptions.create));
    dispatch(toggleModalWindow(true));
  };

  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    createBoard({ title: JSON.stringify(values), owner: 'do_when_it_be_ready', users: [] });
    dispatch(toggleModalWindow(false));
  };

  const handleClickModal = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    if (target?.dataset.id === 'close') {
      dispatch(toggleModalWindow(false));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '80vw',
        height: '80vh',
        margin: '1rem auto',
      }}
    >
      <Typography variant="h4">Boards</Typography>
      <Button
        variant="contained"
        color="success"
        sx={{ width: 'fit-content' }}
        onClick={handleButtonClick}
      >
        Add board
      </Button>
      <BoardsContainer boards={boards} />
      {isModalOpen && (
        <BoardForm
          {...{ option: modalOption, onClick: handleClickModal, onSubmit: handleSubmit }}
        />
      )}
    </Box>
  );
};
