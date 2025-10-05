import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.username
      state.token = payload.token
    },
  },
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer


