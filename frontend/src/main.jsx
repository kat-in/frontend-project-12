import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import store from './store/store.js'
// import { createContext } from 'react'
import { Provider } from 'react-redux'
import App from './App.jsx'


const UserContext = React.createContext({})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
)
