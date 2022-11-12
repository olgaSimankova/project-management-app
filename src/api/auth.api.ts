import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { ISignInFormFields, ISignInResponse, IUser } from '../types/types';
import { setToken, setUser } from '../features/authSlice';

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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ ...data }));
        } catch (error) {}
      },
    }),
    signIn: build.mutation<ISignInResponse, ISignInFormFields>({
      query: (body: ISignInFormFields) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken({ ...data }));
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authSlice;
