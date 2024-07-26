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
import EmpLayout from './pages/EmployerLayout/EmpLayout'
import EmpHeaderSection from './pages/EmployerLayout/EmpHeader'
import Footer from './components/Footer'



function App() {

  return (
    <>
      <Router>
        <Header />
          <Routes>
            {/* public pages */}
            <Route path='/' element={<Home />} />

            {/* AUTH */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* PRIVATE PAGES */}
            <Route path='/new-work' element={<PrivateRoute><NewWork /></PrivateRoute>} />
            <Route path='/works' element={<PrivateRoute><Works /></PrivateRoute>} />
            <Route path='/works/:workId' element={<PrivateRoute><Work /></PrivateRoute>} />
            
            {/* EMPLOYER ADMIN */}
            <Route path='/profile/employer/*' element={<PrivateRoute><EmpLayout/></PrivateRoute>} />
            
            {/* CANDIDATE ADMIN */}
            <Route path='/profile/candidate/*' element={<PrivateRoute><CanLayout/></PrivateRoute>} />
            
            
          </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
