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




const App = () => {

  return (
  <Router>
  <NavBar />
      <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="*" element={<NotFound />} />
      </Routes>
  </Router>
  )
}

export default App
