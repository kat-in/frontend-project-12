
import { configureStore } from '@reduxjs/toolkit';

import { usersApi } from '../services/usersApi.js'
import  authReducer from './slices/authSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware),
})