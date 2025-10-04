import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import NotFound from './pages/NotFound.jsx'
import NavBar from './components/NavBar.jsx'

const App = () => (
  <>
 <NavBar />
  <Router>
      <Routes>
       <Route path="/" element={null} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="*" element={<NotFound />} />
      </Routes>
  </Router>
  </>
)

export default App
