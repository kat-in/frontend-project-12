import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
    reducerPath: 'channels',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/channels',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token; // берем токен из authSlice
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: builder => ({
        getChannels: builder.query({
            query: () => '',
        }),
        addChannel: builder.mutation({
            query: name => ({
                method: 'POST',
                body: name,
            }),
        }),
        editChannel: builder.mutation({
            query: name => ({
                method: 'PATCH',
                body: name,
            }),
        }),
        removeChannel: builder.mutation({
            query: id => ({
                method: 'DELETE',
                url: id,
            }),
        }),

    }),
})

export const { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } = channelsApi
// END
