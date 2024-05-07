
import {useSelector, useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import userImg from '../assets/img/user.png'
import { FaUser, FaHome, FaPaperPlane, FaBriefcase, FaSearch, FaSignOutAlt} from "react-icons/fa";
import { logout } from '../features/auth/authSlice';


import { RiMenu2Line, RiCloseCircleFill } from "react-icons/ri";


function Menu() {
  
  const {user} = useSelector((state)=> state.auth)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(name)
  const clickMenu = () => {
    document.querySelector(".menu-nav").classList.toggle("active")
  }

  const onLogout = () =>{
    dispatch(logout())
    navigate('/')
    clickMenu()
}

  return (
    <>
        <nav>
            <div className="menu-icon" onClick={clickMenu}><RiMenu2Line /></div>
            
            <div className="menu-nav">
              <div className="menu-userbox">
                <div className="menu-userbox__img">
                  <img src={userImg} alt="foto usuario" />
                </div>
                <div className="menu-userbox__name">
                  <h3>{user ?  user.name : "Hola, inicia session"}</h3>
                  <p>{user ? user.username: ""}</p>
                </div>
              </div>
              <hr />
                <div className="menu-icon__close" onClick={clickMenu}><RiCloseCircleFill /></div>
                <ul className="menu-nav__list">
                    <li className="menu-nav__list--item"><Link to="/" onClick={clickMenu}><FaHome /> Inicio</Link></li>
                    <li className="menu-nav__list--item"><Link to="/new-work" onClick={clickMenu}><FaPaperPlane /> Publicar un empleo</Link></li>
                    <li className="menu-nav__list--item"><Link to="/works" onClick={clickMenu}><FaBriefcase /> Gestionar empleos</Link></li>
                    <li className="menu-nav__list--item"><Link to="/" onClick={clickMenu}><FaSearch /> Buscar empleo</Link></li>
                    
                </ul>
                <hr />
                <div className="menu-logout">
                <ul className="menu-nav__list">
                    {user ? (
                      <li className="menu-nav__list--item" ><p onClick={onLogout}><FaSignOutAlt /> Salir</p></li>
                    ):(
                      ""
                    )}
                    
                    
                </ul>
                </div>
            </div>
        </nav>

    </>
  )
}

export default Menu
