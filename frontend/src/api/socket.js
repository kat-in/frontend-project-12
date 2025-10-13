import { io } from 'socket.io-client'

const isDevelopment = window.location.hostname === 'localhost'

const socket = io(isDevelopment ? 'http://localhost:5002' : window.location.origin, {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  secure: !isDevelopment,
  withCredentials: true,
})

export default socket
