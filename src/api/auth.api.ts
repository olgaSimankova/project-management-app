import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { ISignInFormFields, ISignInResponse, ISignUpFormFields, IUser } from '../types/types';

export interface IUserAuthInfo {
  name: string;
  login: string;
  password: string;
}

export const authSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    signUp: build.mutation<IUser, IUserAuthInfo>({
      query: (body: IUserAuthInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation<ISignInResponse, ISignInFormFields>({
      query: (body: ISignInFormFields) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authSlice;
