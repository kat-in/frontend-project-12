import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: user => ({
        method: 'POST', 
        url: 'login',
        body: user,
      }),
    }),
    addUser: builder.mutation({
      query: user => ({
        url: 'signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useAddUserMutation, useLoginUserMutation } = usersApi
// END
