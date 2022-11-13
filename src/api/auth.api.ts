import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { IErrorResponse, ISignInFormFields, ISignInResponse, IUser } from '../types/types';
import { setToken, setUser } from '../features/authSlice';
import { toast } from 'react-toastify';

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
          toast.success('You successfully logged in');
          dispatch(setUser({ ...data }));
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
    signIn: build.mutation<string, ISignInFormFields>({
      query: (body: ISignInFormFields) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
      transformResponse(response: ISignInResponse) {
        return response.token;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success('You successfully logged in');
          dispatch(setToken(data));
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authSlice;
