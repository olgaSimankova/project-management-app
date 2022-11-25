import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { EditableTextField } from 'components/EditableTextField/EditableTextField';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { memo } from 'react';
import { LoadingButton } from '@mui/lab';
import { CheckPasswordModal } from 'components/CheckPasswordModal/CheckPasswordModal';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { UserFields } from 'types/types';

interface SettingsProps {
  handleCloseConfirmWindow: () => void;
  handleDelete: () => void;
  isError: boolean;
  isLoading: boolean;
  handleSubmit: UseFormHandleSubmit<UserFields>;
  handleClickConfirmChanges: () => void;
  credits: { name: string; login: string; password: string; oldPassword: string };
  register: UseFormRegister<UserFields>;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      login: string;
      password: string;
    }>
  >;
  flags: {
    name: boolean;
    login: boolean;
    password: boolean;
    isModal: boolean;
    isDisabled: boolean;
    isConfirmOpen: boolean;
  };
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tag: string) => void;
  deleteLoading: boolean;
  handleDeleteClick: () => void;
  checkPassword: (password: string) => void;
  closeModal: () => void;
}

const Settings = ({
  handleCloseConfirmWindow,
  handleDelete,
  isError,
  isLoading,
  handleSubmit,
  handleClickConfirmChanges,
  credits,
  register,
  errors,
  flags,
  handleClick,
  handleChange,
  deleteLoading,
  handleDeleteClick,
  checkPassword,
  closeModal,
}: SettingsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '74vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleClickConfirmChanges)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          backgroundColor: '#dddddd',
          padding: '2rem',
          borderRadius: '1rem',
        }}
      >
        <Typography variant="h5">Edit your account</Typography>
        <EditableTextField
          defaultValue={credits.name}
          isDisabled={flags.name}
          handleClick={handleClick}
          handleChange={handleChange}
          tag="name"
          register={register}
          errors={errors}
        />
        <EditableTextField
          defaultValue={credits.login}
          isDisabled={flags.login}
          handleClick={handleClick}
          tag="login"
          handleChange={handleChange}
          register={register}
          errors={errors}
        />
        <EditableTextField
          defaultValue={credits.password}
          isDisabled={flags.password}
          handleClick={handleClick}
          tag="password"
          handleChange={handleChange}
          register={register}
          errors={errors}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <LoadingButton
            loading={deleteLoading}
            loadingPosition="start"
            onClick={handleDeleteClick}
            startIcon={<DeleteIcon sx={{ marginLeft: '0.5rem' }} color="error" />}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={flags.isDisabled || !flags.name || !flags.login || !flags.password}
          >
            Confirm changes
          </Button>
        </Box>
      </Box>
      {flags.isModal ? (
        <CheckPasswordModal
          onClickYes={checkPassword}
          onClickNo={closeModal}
          isWrongPassword={isError}
          isLoading={isLoading}
        />
      ) : null}
      {flags.isConfirmOpen ? (
        <ConfirmModal
          question="Do you want to delete user?"
          onYesClick={handleDelete}
          onNoClick={handleCloseConfirmWindow}
        />
      ) : null}
    </Box>
  );
};

export default memo(Settings);
