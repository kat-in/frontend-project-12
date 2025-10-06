import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'allMessages',
  initialState: [],
  reducers: {
    setMessages: (state, { payload }) => payload,
    addMessage: (state, { payload }) => { state.push(payload) }, 
  },
})

export const { setMessages, addMessage } = messagesSlice.actions

export default messagesSlice.reducer