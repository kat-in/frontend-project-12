
import { configureStore } from '@reduxjs/toolkit';

import { usersApi } from '../services/usersApi.js'
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';
import  authReducer from './slices/authSlice.js'
import channelsReducer from '../store/slices/channelsSlice.js';


export default configureStore({
  reducer: {
    auth: authReducer,
    allChannels: channelsReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware, channelsApi.middleware, messagesApi.middleware),
})