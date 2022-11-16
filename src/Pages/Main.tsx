import { Box, Button, Typography } from '@mui/material';
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsMutation,
  useUpdateBoardMutation,
} from 'api/main.api';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { Spinner } from 'components/Spinner/Spinner';
import { QUESTION_ON_DELETE } from 'constants/constants';
import {
  setCurrentBoardData,
  setModalOption,
  toggleConfirmationWindow,
  toggleModalWindow,
} from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import { useMain } from 'hooks/useMain';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { BoardFormOptions } from 'types/types';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  const { isModalOpen, modalOption, boards, currentBoardData, isConfirmationOpen, isLoading } =
    useMain();
  const [getBoards] = useGetBoardsMutation();
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const { title, description } = JSON.parse(currentBoardData.title || '{}');
  useEffect(() => {
    if (token) {
      getBoards({});
    }
  }, [getBoards, token]);

  const handleButtonClick = () => {
    dispatch(setModalOption(BoardFormOptions.create));
    dispatch(toggleModalWindow(true));
  };

  const onDeleteBoard = (id: string) => {
    deleteBoard(id);
    dispatch(toggleConfirmationWindow(false));
    dispatch(setCurrentBoardData(''));
  };

  const onExitConfirmationModal = () => {
    dispatch(toggleConfirmationWindow(false));
  };

  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    switch (modalOption) {
      case BoardFormOptions.create:
        createBoard({ title: JSON.stringify(values), owner: 'do_when_it_be_ready', users: [] });
        dispatch(toggleModalWindow(false));
        break;
      case BoardFormOptions.edit:
        const { users, owner, _id } = currentBoardData;
        dispatch(toggleModalWindow(false));
        updateBoard({ title: JSON.stringify(values), owner, users, _id });
        break;
      default:
    }
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
        height: '71vh',
        margin: '1rem auto',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 7,
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
          borderRadius: 2,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#1976d2',
          outline: `1px solid slategrey`,
          borderRadius: 2,
        },
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
          {...{
            option: modalOption,
            onClick: handleClickModal,
            onSubmit: handleSubmit,
            defaultValue: { title, description },
          }}
        />
      )}
      {isConfirmationOpen && (
        <ConfirmModal
          {...{
            question: QUESTION_ON_DELETE,
            onYesClick: onDeleteBoard,
            onNoClick: onExitConfirmationModal,
            id: currentBoardData._id || '',
          }}
        />
      )}
      {isLoading && <Spinner />}
    </Box>
  );
};
