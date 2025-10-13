import { io } from 'socket.io-client'

// const socket = io(process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5002', {
//   path: '/socket.io',
//   transports: ['websocket', 'polling'],
//   secure: process.env.NODE_ENV === 'production',
//   withCredentials: true,
// })

const socket = io(
  import.meta.env.MODE === 'production' ? window.location.origin : 'http://localhost:5002',
  {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    secure: import.meta.env.MODE === 'production',
    withCredentials: true,
  }
)

export default socket
