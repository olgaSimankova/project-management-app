import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { IAuthInfo, IUser } from '../types/types';

interface ISignUpResponse {
  _id: 'string';
  name: 'string';
  login: 'string';
}

interface ISignInResponse {
  token: 'string';
}

export const authSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    signUp: build.mutation<ISignUpResponse, IUser>({
      query: (body: IUser) => ({
        url: '/auth/signUp',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation<ISignInResponse, IAuthInfo>({
      query: (body: IAuthInfo) => ({
        url: '/auth/signIn',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authSlice;
