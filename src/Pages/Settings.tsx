import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSignInMutation } from 'api/auth.api';
import { useUpdateUserMutation } from 'api/user.api';
import { CheckPasswordModal } from 'components/CheckPasswordModal/CheckPasswordModal';
import { EditableTextField } from 'components/EditableTextField/EditableTextField';
import { setUser } from 'features/authSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const Settings = () => {
  const [signIn, { isLoading, isSuccess, isError, reset: signInReset }] = useSignInMutation();
  const [
    updateUser,
    { isSuccess: isSuccessfullyUpdated, reset: updateReset, isError: updateFailed },
  ] = useUpdateUserMutation();
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
    signIn({ login: user?.login || '', password });
    setCredits((credits) => ({ ...credits, oldPassword: password }));
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
        />
        <EditableTextField
          defaultValue={credits.login}
          isDisabled={flags.login}
          handleClick={handleClick}
          tag="login"
          handleChange={handleChange}
        />
        <EditableTextField
          defaultValue={credits.password}
          isDisabled={flags.password}
          handleClick={handleClick}
          tag="password"
          handleChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleClickConfirmChanges}
          disabled={flags.isDisabled || !flags.name || !flags.login || !flags.password}
        >
          Confirm changes
        </Button>
      </Box>
      {flags.isModal ? (
        <CheckPasswordModal
          onClickYes={checkPassword}
          onClickNo={closeModal}
          isWrongPassword={isError}
          isLoading={isLoading}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};
