import { createSlice } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice'

const messagesSlice = createSlice({
  name: 'allMessages',
  initialState: [],
  reducers: {
    setMessages: (state, { payload }) => payload,
    addMessage: (state, { payload }) => {
      const existingIds = new Set(state.map(m => m.id))
      if (!existingIds.has(payload.id)) state.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const channdelId = payload.channdelId
      return state.filter(message => message.channdelId !== channdelId)
    })
  },
})

export const { setMessages, addMessage } = messagesSlice.actions

export default messagesSlice.reducer
