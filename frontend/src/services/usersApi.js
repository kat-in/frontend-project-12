import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//пока черновик
export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tasks' }),
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => '',
      //нужно добавить тег для обновления списка после операций удаления/добавления
      providesTags: ['Tasks'],
    }),
    addTask: builder.mutation({
      query: task => ({
        method: 'POST', 
        body: task,
      }),
      //отслеживаем тег который надо обновить после добавления
      invalidatesTags: ['Tasks'],
    }),
    removeTask: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
      //отслеживаем тег после удаления
      invalidatesTags: ['Tasks'],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation } = usersApi
// END
