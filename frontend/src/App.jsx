import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import NotFound from './pages/NotFound.jsx'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'




const App = ({socket}) => {

  return (
    <Router>
      <div className='h-100' id='chat'>
        <div className='d-flex flex-column h-100'></div>
        <NavBar />

        <div className='container h-100 my-4 overflow-hidden rounded shadow'>
          <Routes>
            <Route path="/" element={<HomePage socket={socket} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
     <div className="Toastify"></div>
      </div>
    </Router>
  )
}

export default App
