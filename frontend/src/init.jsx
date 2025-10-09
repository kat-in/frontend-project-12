import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import store from './store/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { io } from 'socket.io-client'

const init = () => {


//    const socket = io('http://localhost:5002', {
//   path: '/socket.io',       // путь для проксирования
//   transports: ['websocket', 'polling'], // обязательно для прокси
// });

 const socket = io('wws://chat-rfzu.onrender.com:443', {
  path: '/socket.io',       // путь для проксирования
  transports: ['websocket', 'polling'], // обязательно для прокси
});

    return createRoot(document.getElementById('root')).render(
        <Provider store={store}>
            <App socket={socket} />
        </Provider>
    )
}

export default init

