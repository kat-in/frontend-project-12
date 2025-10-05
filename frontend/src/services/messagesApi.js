import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/messages',
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
        }),
        addMessage: builder.mutation({
            query: message => ({
                method: 'POST',
                body: message,
            }),
        }),
        editMessage: builder.mutation({
            query: ({id, body}) => ({
                method: 'PATCH',
                body,
                url: id,
            }),
        }),
        removeMessage: builder.mutation({
            query: id => ({
                method: 'DELETE',
                url: id,
            }),
        }),

    }),
})

export const { useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation } = messagesApi
// END
