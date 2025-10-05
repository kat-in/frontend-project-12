import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'allMessages',
  initialState: [],
  reducers: {
    setMessages: (state, { payload }) => payload,
  },
})

export const { setMessages } = messagesSlice.actions

export default messagesSlice.reducer