import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { socket } from './socket'

export const messagesApi = createApi({
  reducerPath: 'messages',
  tagTypes: ['Messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token // берем токен из authSlice
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
      pollingInterval: 2000,
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        const messageHandler = (newMessage) => {
          updateCachedData(draft => {
            draft.push(newMessage)
          })
        }

        socket.on('newMessage', messageHandler)

        await cacheEntryRemoved
        socket.off('newMessage', messageHandler)
      }
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
