import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSignInMutation, useSignUpMutation } from '../api/auth.api';
import { Error, IAuthFormFields } from '../types/types';
import { useAuth } from '../hooks/useAuth';
import { LINKS } from '../constants/constants';
import { signUpSchema } from '../schema/signUpSchema';
import { signInSchema } from '../schema/signInSchema';
import { setUserInfo } from '../features/authSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';

const Authentication = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isSignIn = location.pathname === LINKS.signIn;
  const authSchema = isSignIn ? signInSchema : signUpSchema;
  const dispatch = useAppDispatch();
  const [signIn, { data, isLoading, isSuccess, error, isError, reset: signInReset }] =
    useSignInMutation();
  const [
    signUp,
    {
      isLoading: isAuthLoading,
      isSuccess: isAuthSuccess,
      error: authError,
      isError: isAuthError,
      reset: signUpReset,
    },
  ] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthFormFields>({
    resolver: yupResolver(authSchema),
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate(LINKS.welcome);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (isSuccess && isSignIn && data) {
      toast.success('You successfully logged in');
      dispatch(setUserInfo(data));
    }

    if (isAuthSuccess && !isSignIn) {
      toast.success('You successfully create account');
      navigate(LINKS.signIn);
    }
  }, [isSuccess, isSignIn, isAuthSuccess, navigate, dispatch, data]);

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).data.message);
    }

    if (isAuthError) {
      toast.error((authError as Error).data.message);
    }
  }, [isError, isAuthError, authError, error]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!isLoading && isSignIn) {
      const { login, password } = data;
      signIn({ login, password });
    }

    if (!isAuthLoading && !isSignIn) {
      const { name, login, password } = data;
      signUp({ name, login, password });
    }
  };

  const handleResetForm = () => {
    reset();
    signUpReset();
    signInReset();
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ margin: '0 auto' }}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignIn ? t('signIn') : t('signUp')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {!isSignIn && (
            <TextField
              {...register('name')}
              autoComplete="given-name"
              name="name"
              fullWidth
              id="firstName"
              label={t('firstName')}
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
          <TextField
            {...register('login')}
            margin="normal"
            fullWidth
            id="login"
            label={t('login')}
            name="login"
            type="text"
            autoComplete="login"
            error={!!errors.login}
            helperText={errors.login?.message}
          />
          <TextField
            {...register('password')}
            margin="normal"
            fullWidth
            name="password"
            label={t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {!isSignIn && (
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox {...register('agree', { required: true })} name="agree" />}
                label={t('processingPersonalData')}
              />
              <FormHelperText error={!!errors.agree}>{errors.agree?.message}</FormHelperText>
            </Grid>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isSignIn ? t('signIn') : t('signUp')}
            {(isLoading || isAuthLoading) && (
              <CircularProgress size={16} color={'inherit'} sx={{ ml: 2 }} />
            )}
          </Button>
          <Grid container justifyContent={'end'}>
            <Grid item onClick={handleResetForm}>
              {isSignIn ? (
                <Link href={LINKS.signUp}>{t('dontHaveAccount')}</Link>
              ) : (
                <Link href={LINKS.signIn}>{t('haveAccount')}</Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Authentication;
