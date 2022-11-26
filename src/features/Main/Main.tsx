import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { BoardForm } from 'components/BoardForm/BoardForm';
import { BoardsContainer } from 'components/BoardsContainer/BoardsContainer';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { TFunction } from 'i18next';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { BoardConfig, BoardFormOptions } from 'types/types';

interface MainProps {
  t: TFunction<'translation', undefined>;
  isCreating: boolean;
  handleButtonClick: () => void;
  userBoards: BoardConfig[];
  isFetching: boolean;
  isGetting: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  updateBoard: MutationTrigger<
    MutationDefinition<
      BoardConfig,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      'boards',
      BoardConfig,
      'mainApi'
    >
  >;
  isModalOpen: boolean;
  modalOption: BoardFormOptions;
  title: string;
  description: string;
  handleClickModal: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
  handleSubmit: (values: FieldValues) => void;
  isConfirmationOpen: boolean;
  onDeleteBoard: () => void;
  onExitConfirmationModal: () => void;
}

export const Main = ({
  t,
  isCreating,
  handleButtonClick,
  userBoards,
  isFetching,
  isGetting,
  isUpdating,
  isDeleting,
  updateBoard,
  isModalOpen,
  modalOption,
  title,
  description,
  handleClickModal,
  handleSubmit,
  isConfirmationOpen,
  onDeleteBoard,
  onExitConfirmationModal,
}: MainProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        width: '80vw',
        height: 'calc(100vh - 114px)',
        margin: '0 auto',
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
      <Typography variant="h4">{t('Boards')}</Typography>
      <LoadingButton
        loading={isCreating}
        color="success"
        sx={{ width: 'fit-content', padding: '10px 10px' }}
        onClick={handleButtonClick}
      >
        {t('addBoard')}
      </LoadingButton>
      <BoardsContainer
        boards={userBoards}
        isLoading={isFetching && isGetting}
        isDeleting={isDeleting}
        isEditing={isUpdating}
        update={updateBoard}
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
            question: t('questuionDelete'),
            onYesClick: onDeleteBoard,
            onNoClick: onExitConfirmationModal,
          }}
        />
      )}
    </Box>
  );
};
