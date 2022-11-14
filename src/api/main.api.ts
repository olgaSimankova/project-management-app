import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'App/state/store';
import { setBoards } from 'features/mainSlice';
import { toast } from 'react-toastify';
import { BoardConfig, IErrorResponse } from 'types/types';
import { BASE_URL } from '../constants/constants';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      console.log(token, 'token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getBoards: build.mutation<BoardConfig[], unknown>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setBoards(data));
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
  }),
});

export const { useGetBoardsMutation } = mainApi;
