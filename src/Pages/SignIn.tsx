import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
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
import { useAppDispatch } from '../App/state/store';
import { setToken } from '../features/authSlice';

const SignIn = () => {
  const [signIn, { data, isSuccess, isError, error }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormFields>({
    resolver: yupResolver(signInSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { login, password } = data;
    signIn({ login, password });
  };

  useEffect(() => {
    isSuccess ? toast.success('Logged successfully') : null;
    console.log(data);
    if (data) {
      dispatch(setToken({ token: data.token }));
    }
  }, [isSuccess]);

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
