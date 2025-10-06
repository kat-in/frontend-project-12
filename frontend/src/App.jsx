import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import NotFound from './pages/NotFound.jsx'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'




const App = ({socket}) => {

  return (
    <Router>
        <div className='d-flex flex-column h-100'>
        <NavBar />
       
          <Routes>
            <Route path="/" element={<HomePage socket={socket} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </div>
      
     <div className="Toastify"></div>
  
    </Router>
  )
}

export default App
