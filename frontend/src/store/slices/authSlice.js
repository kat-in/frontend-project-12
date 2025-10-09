import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.username
      state.token = payload.token
    },
     removeCredentials: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setCredentials, removeCredentials } = authSlice.actions

export default authSlice.reducer


