import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
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
import { useAuth } from 'hooks/useAuth';
import { useMain } from 'hooks/useMain';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BoardFormOptions, ErrorObject } from 'types/types';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalOption, boardID, isConfirmationOpen } = useMain();
  const { user } = useAuth();
  const { data: boards = [], isLoading: isGetting, isFetching } = useGetBoardsQuery();

  const [
    createBoard,
    {
      isLoading: isCreating,
      isError: isCreatingFailed,
      error: creatingError,
      isSuccess: createSuccess,
      reset: createBordReset,
    },
  ] = useCreateBoardMutation();
  const [
    updateBoard,
    {
      isLoading: isUpdating,
      isError: isUpdatingFailed,
      error: updatingError,
      isSuccess: updateSuccess,
      reset: updateBordReset,
    },
  ] = useUpdateBoardMutation();
  const [
    deleteBoard,
    {
      isLoading: isDeleting,
      isError: isDeletingFailed,
      error: deletingError,
      isSuccess: deleteSuccess,
      reset: deleteBordReset,
    },
  ] = useDeleteBoardMutation();

  const toastErrorDisplay = (error: ErrorObject) => {
    toast.error(error?.data?.message || 'Something went wrong');
  };

  if (isUpdatingFailed) {
    toastErrorDisplay(updatingError as ErrorObject);
    updateBordReset();
  }
  if (isDeletingFailed) {
    toastErrorDisplay(deletingError as ErrorObject);
    deleteBordReset();
  }
  if (isCreatingFailed) {
    toastErrorDisplay(creatingError as ErrorObject);
    createBordReset();
  }

  if (createSuccess) {
    toast.success('Board has been created!');
    createBordReset();
  }

  if (updateSuccess) {
    toast.success('Board has been updated!');
    updateBordReset();
  }

  if (deleteSuccess) {
    toast.success('Board has been deleted!');
    deleteBordReset();
  }

  useEffect(() => {
    dispatch(setBoardID(''));
  }, [isFetching, dispatch]);

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
  };

  const onExitConfirmationModal = () => {
    dispatch(toggleConfirmationWindow(false));
  };
  console.log(user);
  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    switch (modalOption) {
      case BoardFormOptions.create:
        createBoard({ title: JSON.stringify(values), owner: 'do_when_it_be_ready', users: [] });
        dispatch(toggleModalWindow(false));
        break;
      case BoardFormOptions.edit:
        const { users, owner, _id } = boards.filter(({ _id }) => _id === boardID)[0];
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
      <LoadingButton
        loading={isCreating}
        color="success"
        variant="contained"
        sx={{ width: 'fit-content' }}
        onClick={handleButtonClick}
      >
        Add board
      </LoadingButton>
      <BoardsContainer
        boards={boards}
        isLoading={isFetching && isGetting}
        isDeleting={isDeleting}
        isEditing={isUpdating}
      />
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
