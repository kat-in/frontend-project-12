import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'allChannels',
  initialState: [],
  reducers: {
    setChannels: (state, { payload }) => payload,
  },
})

export const { setChannels } = channelsSlice.actions

export default channelsSlice.reducer