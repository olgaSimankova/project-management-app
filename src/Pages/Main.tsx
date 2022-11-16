import { Box, Button, Typography } from '@mui/material';
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from 'api/main.api';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { QUESTION_ON_DELETE } from 'constants/constants';
import {
  setBoardID,
  setModalOption,
  toggleConfirmationWindow,
  toggleModalWindow,
} from 'features/mainSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useMain } from 'hooks/useMain';
import React from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { BoardFormOptions } from 'types/types';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalOption, boardID, isConfirmationOpen } = useMain();
  const { data: boards = [], isLoading: isGetting } = useGetBoardsQuery();
  const [createBoard, { isLoading: isCreating }] = useCreateBoardMutation();
  const [updateBoard, { isLoading: isUpdating }] = useUpdateBoardMutation();
  const [deleteBoard, { isLoading: isDeleting }] = useDeleteBoardMutation();
  const isLoading = isGetting || isCreating || isUpdating || isDeleting;
  const { title, description } = JSON.parse(
    boards.filter((board) => board._id === boardID)[0]?.title || '{}'
  );

  const handleButtonClick = () => {
    dispatch(setModalOption(BoardFormOptions.create));
    dispatch(toggleModalWindow(true));
  };

  const onDeleteBoard = () => {
    deleteBoard(boardID);
    dispatch(toggleConfirmationWindow(false));
    dispatch(setBoardID(''));
  };

  const onExitConfirmationModal = () => {
    dispatch(toggleConfirmationWindow(false));
  };

  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    switch (modalOption) {
      case BoardFormOptions.create:
        createBoard({ title: JSON.stringify(values), owner: 'do_when_it_be_ready', users: [] });
        dispatch(toggleModalWindow(false));
        dispatch(setBoardID(''));
        break;
      case BoardFormOptions.edit:
        const { users, owner, _id } = boards.filter(({ _id }) => _id === boardID)[0];
        dispatch(toggleModalWindow(false));
        updateBoard({ title: JSON.stringify(values), owner, users, _id });
        dispatch(setBoardID(''));
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
      <BoardsContainer boards={boards} isLoading={isLoading} />
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
          }}
        />
      )}
    </Box>
  );
};
