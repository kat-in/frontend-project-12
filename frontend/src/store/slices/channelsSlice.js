import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'allChannels',
  initialState: [],
  reducers: {
    setChannels: (state, { payload }) => payload,
    addChannel: (state, { payload }) => { state.push(payload) },
    removeChannel: (state, { payload }) => {
      return state.filter(ch => ch.id !== payload.id)
    },
  },

})

export const { setChannels, addChannel, removeChannel } = channelsSlice.actions

export default channelsSlice.reducer