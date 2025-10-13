// import { createSlice } from '@reduxjs/toolkit'

// const channelsSlice = createSlice({
//   name: 'allChannels',
//   initialState: [],
//   reducers: {
//     setChannels: (state, { payload }) => payload,
//     addChannel: (state, { payload }) => { state.push(payload) },
//     removeChannel: (state, { payload }) => {
//       return state.filter(ch => ch.id !== payload.id)
//     },
//     renameChannel: (state, { payload }) => {
//       const channel = state.find(ch => ch.id === payload.id)
//       if (channel) {
//         channel.name = payload.name
//       }
//     },
//   },
// })

// export const { setChannels, addChannel, removeChannel, renameChannel } = channelsSlice.actions

// export default channelsSlice.reducer
