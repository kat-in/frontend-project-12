import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
    reducerPath: 'channels',
    tagTypes: ['Channels'],
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
            providesTags: ['Channels'],
            refetchOnMountOrArgChange: true,
            pollingInterval: 2000,

        }),
        addChannel: builder.mutation({
            query: name => ({
                method: 'POST',
                body: name,
            }),
            invalidatesTags: ['Channels'],
        }),
        editChannel: builder.mutation({
            query: ({ name, id }) => ({
                method: 'PATCH',
                body: { name },
                url: `/${id}`,
            }),
            invalidatesTags: ['Channels'],
        }),
        removeChannel: builder.mutation({
            query: id => ({
                method: 'DELETE',
                url: id,
            }),
            invalidatesTags: ['Channels'],
        }),

    }),
})

export const { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation } = channelsApi
// END
