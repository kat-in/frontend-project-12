import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'allChannels',
  initialState: [],
  reducers: {
    setChannels: (state, { payload }) => payload,
    addChannel: (state, { payload }) => { state.push(payload) }, 
  },
})

export const { setChannels, addChannel } = channelsSlice.actions

export default channelsSlice.reducer