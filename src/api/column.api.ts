import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { IColumn, IColumnRequestParams, IGetColumnParams } from '../types/types';
import { RootState } from '../App/state/store';

export const columnApi = createApi({
  reducerPath: 'columnApi',
  tagTypes: ['columns'],
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
    getColumns: build.query<IColumn[], string>({
      query: (id?: string) => ({
        url: `boards/${id}/columns`,
      }),
      providesTags: ['columns'],
    }),
    createColumn: build.mutation<IColumn, IColumnRequestParams>({
      query: ({ boardId, title, order }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: { title, order },
      }),
      invalidatesTags: ['columns'],
    }),
    getColumn: build.query<IColumn, IGetColumnParams>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns${columnId}`,
      }),
    }),
    updateColumn: build.mutation<IColumn, IColumnRequestParams>({
      query: ({ boardId, columnId, title, order }) => ({
        url: `boards/${boardId}/columns;${columnId}`,
        method: 'PUT',
        body: { title, order },
      }),
      invalidatesTags: ['columns'],
    }),
    deleteColumn: build.mutation<IColumn, IGetColumnParams>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns;${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['columns'],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useGetColumnQuery,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = columnApi;
