import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewWork from './pages/NewWork'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Works from './pages/Works'
import Work from './pages/Work'
import CanLayout from './pages/CandidateLayout/CanLayout'
import Footer from './components/Footer'



function App() {

  return (
    <>
      <Router>
        
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-work' element={<PrivateRoute><NewWork /></PrivateRoute>} />
            <Route path='/works' element={<PrivateRoute><Works /></PrivateRoute>} />
            <Route path='/works/:workId' element={<PrivateRoute><Work /></PrivateRoute>} />
            <Route path='/profile/Candidate/*' element={<PrivateRoute><CanLayout/></PrivateRoute>} />
            
          </Routes>
          <Footer />
        
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
