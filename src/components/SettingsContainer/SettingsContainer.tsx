import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { EditableTextField } from 'components/EditableTextField/EditableTextField';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { CheckPasswordModal } from 'components/CheckPasswordModal/CheckPasswordModal';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { SettingsContainerProps } from 'types/types';

export const SettingsContainer = ({
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
}: SettingsContainerProps) => {
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
