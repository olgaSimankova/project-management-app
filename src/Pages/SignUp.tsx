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
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpFormFields } from '../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../schema/signUpSchema';
import { useSignUpMutation } from '../api/auth.api';
import { useAuth } from '../hooks/useAuth';

const SignUp = () => {
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormFields>({
    resolver: yupResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate('/signin');
    }
  }, [isSuccess, navigate]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!isLoading) {
      const { name, login, password } = data;
      signUp({ name, login, password });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                {...register('name')}
                autoComplete="given-name"
                name="name"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('login')}
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="login"
                error={!!errors.login}
                helperText={errors.login?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password')}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox {...register('agree', { required: true })} name="agree" />}
                label="I agree to the processing of personal data."
              />
              <FormHelperText error={!!errors.password}>{errors.agree?.message}</FormHelperText>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
            {isLoading && <CircularProgress size={16} color={'inherit'} sx={{ ml: 2 }} />}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to={'/signIn'}>Already have an account? Sign in</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
