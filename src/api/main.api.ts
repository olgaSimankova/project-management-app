import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'App/state/store';
import { toast } from 'react-toastify';
import { BoardConfig, IErrorResponse } from 'types/types';
import { BASE_URL } from '../constants/constants';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  tagTypes: ['boards'],
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
    getBoards: build.query<BoardConfig[], void>({
      query: () => ({
        url: '/boards',
      }),
      providesTags: ['boards'],
    }),
    createBoard: build.mutation<BoardConfig, BoardConfig>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['boards'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
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
      invalidatesTags: ['boards'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Board has been deleted!');
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
    updateBoard: build.mutation<BoardConfig, BoardConfig>({
      query: (body: BoardConfig) => {
        const data = { ...body };
        delete data._id;
        return {
          url: `/boards/${body._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['boards'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Board has been updated!');
        } catch (error) {
          toast.error((error as IErrorResponse).error.data.message);
        }
      },
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = mainApi;
