import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import {
  ISignInFormFields,
  ISignInResponse,
  IUser,
  IUserAuthInfo,
  IUserSavingData,
} from '../types/types';

export const authApi = createApi({
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
    signIn: build.mutation<IUserSavingData, ISignInFormFields>({
      query: (body: ISignInFormFields) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
      transformResponse(response: ISignInResponse, _, arg: ISignInFormFields) {
        return { token: response.token, login: arg.login };
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
