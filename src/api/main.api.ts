import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'App/state/store';
import { addBoard, deleteBoard, setBoards } from 'features/mainSlice';
import { toast } from 'react-toastify';
import { BoardConfig, IErrorResponse } from 'types/types';
import { BASE_URL } from '../constants/constants';

export const mainApi = createApi({
  reducerPath: 'mainApi',
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
    getBoards: build.mutation<BoardConfig[], unknown>({
      query: () => ({
        url: '/boards',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setBoards(data));
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
    createBoard: build.mutation<BoardConfig, BoardConfig>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addBoard(data));
          toast.success('New board has been created!');
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
    deleteBoard: build.mutation<BoardConfig, unknown>({
      query: (board_id: string) => ({
        url: `/boards/${board_id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success('Board has been deleted!');
          dispatch(deleteBoard(data._id || ''));
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
  }),
});

export const { useGetBoardsMutation, useCreateBoardMutation, useDeleteBoardMutation } = mainApi;
