import { io } from 'socket.io-client'

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
