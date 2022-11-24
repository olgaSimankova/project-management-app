import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  useCheckUserPasswordMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from 'api/user.api';
import { CheckPasswordModal } from 'components/CheckPasswordModal/CheckPasswordModal';
import { EditableTextField } from 'components/EditableTextField/EditableTextField';
import { logout, setUser } from 'features/authSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmModal } from 'components/ConfirmModal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { LINKS } from 'constants/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from 'schema/userSchema';
import { UserFields } from 'types/types';

export const Settings = () => {
  const [checkUserPassword, { isLoading, isSuccess, isError, reset: signInReset }] =
    useCheckUserPasswordMutation();
  const [
    updateUser,
    { isSuccess: isSuccessfullyUpdated, reset: updateReset, isError: updateFailed },
  ] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [deleteUser, { isSuccess: userDeleted, reset: deleteReset, isLoading: deleteLoading }] =
    useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [credits, setCredits] = useState({
    name: user?.name || '',
    login: user?.login || '',
    password: '',
    oldPassword: '',
    user: '',
  });
  const [flags, setFlags] = useState({
    name: true,
    login: true,
    password: true,
    isModal: false,
    isDisabled: true,
    isConfirmOpen: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFields>({
    defaultValues: { name: credits.name, login: credits.login, password: '' },
    resolver: yupResolver(userSchema),
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tag: string) => {
    const target = (e.target as HTMLElement).closest('.top-level') as HTMLElement;
    switch (target?.dataset?.id) {
      case `edit-${tag}`:
        setFlags((flags) => ({ ...flags, [tag]: false }));
        break;
      case `done-${tag}`:
        setFlags((flags) => ({ ...flags, [tag]: true }));
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tag: string
  ) => {
    setFlags((flags) => ({ ...flags, isDisabled: false }));
    setCredits((credits) => ({ ...credits, [tag]: e.target.value }));
  };

  const handleClickConfirmChanges = () => {
    setFlags((flags) => ({ ...flags, isModal: true }));
  };

  const closeModal = () => {
    setFlags((flags) => ({ ...flags, isModal: false }));
  };
  const checkPassword = (password: string) => {
    checkUserPassword({ login: user?.login || '', password });
    setCredits((credits) => ({ ...credits, oldPassword: password }));
  };
  const handleDeleteClick = () => {
    setFlags((flags) => ({ ...flags, isConfirmOpen: true }));
  };
  const handleDelete = () => {
    setFlags((flags) => ({ ...flags, isConfirmOpen: false }));
    deleteUser(user?._id || '');
  };
  const handleCloseConfirmWindow = () => {
    setFlags((flags) => ({ ...flags, isConfirmOpen: false }));
  };
  useEffect(() => {
    if (isSuccess) {
      closeModal();
      signInReset();
      setCredits((credits) => ({
        ...credits,
        user: JSON.stringify({ _id: user?._id || '', name: credits.name, login: credits.login }),
      }));
      updateUser({
        _id: user?._id || '',
        name: credits.name,
        login: credits.login,
        password: credits.password.length ? credits.password : credits.oldPassword,
      });
    }
  }, [
    isSuccess,
    credits.login,
    credits.name,
    credits.password,
    credits.oldPassword,
    dispatch,
    signInReset,
    updateUser,
    user?._id,
  ]);

  useEffect(() => {
    if (userDeleted) {
      dispatch(logout());
      navigate(LINKS.welcome);
      dispatch(setUser({ _id: '', name: '', login: '' }));
      deleteReset();
    }
  }, [userDeleted, dispatch, navigate, deleteReset]);

  useEffect(() => {
    if (isSuccessfullyUpdated) {
      updateReset();
      setFlags((flags) => ({ ...flags, isDisabled: true }));
      dispatch(setUser({ _id: user?._id || '', name: credits.name, login: credits.login }));
      toast.success('Success! Updated!');
    }
  }, [isSuccessfullyUpdated, dispatch, updateReset, user?._id, credits.login, credits.name]);

  if (updateFailed) {
    toast.error('This login already exists');
    setFlags((flags) => ({ ...flags, isDisabled: true }));
    updateReset();
  }
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
