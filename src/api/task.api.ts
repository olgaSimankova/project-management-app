import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { IGetParams, ITaskConfig, ITasksPatch } from '../types/types';
import { RootState } from '../App/state/store';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  tagTypes: ['task'],
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
    getTasks: build.query<ITaskConfig[], IGetParams>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
      }),
      transformResponse: (response: ITaskConfig[]) => {
        return response.sort((a, b) => a.order - b.order);
      },
      providesTags: ['task'],
    }),
    createTask: build.mutation<ITaskConfig, ITaskConfig>({
      query: ({ boardId, columnId, ...body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['task'],
    }),
    getTask: build.query<ITaskConfig, IGetParams>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      }),
    }),
    updateTask: build.mutation<ITaskConfig, ITaskConfig>({
      query: ({ boardId, columnId, taskId, ...body }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: { ...body, columnId },
      }),
      invalidatesTags: (result) => [{ type: 'task', id: result?.taskId }],
    }),
    deleteTask: build.mutation<ITaskConfig, IGetParams>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['task'],
    }),
    tasksSet: build.mutation<ITaskConfig[], ITasksPatch[]>({
      query: (body) => ({
        url: '/tasksSet',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useTasksSetMutation,
} = taskApi;
