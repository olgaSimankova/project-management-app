import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSignInMutation } from '../api/auth.api';
import { ISignInFormFields } from '../types/types';
import { signInSchema } from '../schema/signInSchema';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const SignIn = () => {
  const [signIn, { isLoading, isSuccess, isError }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormFields>({
    resolver: yupResolver(signInSchema),
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  if (token) {
    navigate('/');
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!isLoading) {
      const { login, password } = data;
      signIn({ login, password });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in');
      navigate('/');
    }

    if (isError) {
      toast.error('Wrong login or password');
    }
  }, [isLoading]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            {...register('login')}
            margin="normal"
            fullWidth
            id="login"
            label="Login"
            name="login"
            type="text"
            autoComplete="login"
            error={!!errors.login}
            helperText={errors.login?.message}
            autoFocus
          />
          <TextField
            {...register('password')}
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
            {isLoading && <CircularProgress size={16} color={'inherit'} sx={{ ml: 2 }} />}
          </Button>
          <Grid container justifyContent={'end'}>
            <Grid item>
              <NavLink to={'/signUp'} end>
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
