import { configureStore } from '@reduxjs/toolkit'

import { usersApi } from '../api/usersApi.js'
import { channelsApi } from '../api/channelsApi.js'
import { messagesApi } from '../api/messagesApi.js'
import authReducer from './slices/authSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware, channelsApi.middleware, messagesApi.middleware),
})
