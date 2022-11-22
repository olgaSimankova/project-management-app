import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { RootState } from '../App/state/store';
import { FullUserData, IUser } from '../types/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: '/users',
      }),
    }),
    updateUser: build.mutation<IUser, FullUserData>({
      query: ({ _id, name, login, password }: FullUserData) => ({
        url: `/users/${_id}`,
        method: 'PUT',
        body: { name, login, password },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;
