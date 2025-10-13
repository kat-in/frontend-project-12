import { io } from 'socket.io-client'

// const socket = io('http://localhost:5002', {
//     path: '/socket.io', // путь для проксирования
//     transports: ['websocket', 'polling'], // обязательно для прокси
//     autoConnect: false, 
//     // reconnection: true,
//     // reconnectionAttempts: 5,
//     // reconnectionDelay: 1000,
//     // timeout: 5000,
// })

const socket = io(process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5002', {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  secure: process.env.NODE_ENV === 'production',
  withCredentials: true
})

export default socket