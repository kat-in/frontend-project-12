import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import LogIn from './pages/LogIn.jsx'
import NotFound from './pages/NotFound.jsx'
import NavBar from './components/NavBar.jsx'
import Chat from './pages/Chat.jsx'
import SignUp from './pages/SignUp.jsx'
import { ModalProvider } from './contexts/ModalContext.jsx'
import { ChannelProvider } from './contexts/ChannelContext.jsx'

const App = ({ socket }) => {

  return (
    <Router>
      <div className='d-flex flex-column h-100'>
        <NavBar />
        <ChannelProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<Chat socket={socket} />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ModalProvider>
        </ChannelProvider>
      </div>

      {/* <div className="Toastify"></div> */}

    </Router>
  )
}

export default App
