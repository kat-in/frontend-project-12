import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
  reducerPath: 'messages',
  tagTypes: ['Messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: message => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
    editMessage: builder.mutation({
      query: ({ id, body }) => ({
        method: 'PATCH',
        body,
        url: id,
      }),
      invalidatesTags: ['Messages'],
    }),
    removeMessage: builder.mutation({
      query: id => ({
        method: 'DELETE',
        url: id,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const { useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation } = messagesApi
// END
