import { createSlice } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'

const messagesSlice = createSlice({
  name: 'allMessages',
  initialState: [],
  reducers: {
    setMessages: (state, { payload }) => payload,
    addMessage: (state, { payload }) => {
      const existingIds = new Set(state.map(m => m.id));
      payload.forEach(msg => {
        if (!existingIds.has(msg.id)) state.push(msg);
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const channdelId = payload.channdelId
      return state.filter(message => message.channdelId !== channdelId)
    })

  }
})

export const { setMessages, addMessage } = messagesSlice.actions

export default messagesSlice.reducer