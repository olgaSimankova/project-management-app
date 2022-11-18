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
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BoardFormOptions, ErrorObject } from 'types/types';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalOption, boardID, isConfirmationOpen } = useMain();

  const {
    data: boards = [],
    isLoading: isGetting,
    isError: isGettingFailed,
    error: gettingError,
  } = useGetBoardsQuery();
  const [
    createBoard,
    {
      isLoading: isCreating,
      isError: isCreatingFailed,
      error: creatingError,
      isSuccess: createSuccess,
    },
  ] = useCreateBoardMutation();
  const [
    updateBoard,
    {
      isLoading: isUpdating,
      isError: isUpdatingFailed,
      error: updatingError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateBoardMutation();
  const [
    deleteBoard,
    {
      isLoading: isDeleting,
      isError: isDeletingFailed,
      error: deletingError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteBoardMutation();

  const isLoading = isGetting || isCreating || isUpdating || isDeleting;
  const toastErrorDisplay = (error: ErrorObject) => {
    toast.error(error.data.message || 'Something went wrong');
  };

  useEffect(() => {
    if (isGettingFailed) {
      toastErrorDisplay(gettingError as ErrorObject);
    }
    if (isUpdatingFailed) {
      toastErrorDisplay(updatingError as ErrorObject);
    }
    if (isDeletingFailed) {
      toastErrorDisplay(deletingError as ErrorObject);
    }
    if (isCreatingFailed) {
      toastErrorDisplay(creatingError as ErrorObject);
    }
  }, [
    isCreatingFailed,
    isDeletingFailed,
    isUpdatingFailed,
    isGettingFailed,
    gettingError,
    updatingError,
    deletingError,
    creatingError,
  ]);

  useEffect(() => {
    if (createSuccess) {
      toast.success('Board has been created!');
    }
  }, [createSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success('Board has been updated!');
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Board has been deleted!');
    }
  }, [deleteSuccess]);

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
    dispatch(setBoardID(''));
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
      dispatch(setBoardID(''));
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
