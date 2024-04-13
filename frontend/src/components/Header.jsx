import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Menu from './Menu'
import Kippha from '../assets/img/Kippha.png'

function Header() { 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='header'>
        <Menu />
        <div className="logo">
            <Link to='/'><img className="ringojob__logo" src={Kippha} alt="RingoJob" /></Link>
        </div>
        <ul>
            {user ? (
                <>
                <li>
                    <button className="btn" onClick={onLogout}><FaSignOutAlt /> Salir</button>
                </li>
                </>
            ) : (
            <>
            <li>
                <Link to='/login'><FaSignInAlt /> Ingresar</Link>
            </li>
            <li>
                <Link to='/register'><FaUser /> Registrate</Link>
            </li>
            </>
            )}
            
        </ul>
    </header>
  )
}

export default Header
