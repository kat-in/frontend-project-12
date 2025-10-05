import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/messages',
        tagTypes: ['Message'],
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token; // берем токен из authSlice
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
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
            invalidatesTags: ['Message'],
        }),
        editMessage: builder.mutation({
            query: ({id, body}) => ({
                method: 'PATCH',
                body,
                url: id,
            }),
            invalidatesTags: ['Message'],
        }),
        removeMessage: builder.mutation({
            query: id => ({
                method: 'DELETE',
                url: id,
            }),
        }),
        invalidatesTags: ['Message'],
    }),
})

export const { useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation } = messagesApi
// END
