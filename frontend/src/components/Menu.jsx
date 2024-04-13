
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import userImg from '../assets/img/user.png'
import { FaUser, FaHome, FaPaperPlane, FaBriefcase, FaSearch} from "react-icons/fa";


import { RiMenu2Line, RiCloseCircleFill } from "react-icons/ri";


function Menu() {

  const {name} = useSelector((state)=> state.auth.user)
  
  console.log(name)
  const clickMenu = () => {
    document.querySelector(".menu-nav").classList.toggle("active")
  }

  const logout = ()=>{
    console.log("fuera!")
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
                  <h3>{name}</h3>
                  <p>@username</p>
                </div>
              </div>
              <hr />
                <div className="menu-icon__close" onClick={clickMenu}><RiCloseCircleFill /></div>
                <ul className="menu-nav__list">
                    <li className="menu-nav__list--item"><Link to="/"><FaHome /> Inicio</Link></li>
                    <li className="menu-nav__list--item"><Link to="/new-work"><FaPaperPlane /> Publicar un empleo</Link></li>
                    <li className="menu-nav__list--item"><Link to="/works"><FaBriefcase /> Gestionar empleos</Link></li>
                    <li className="menu-nav__list--item"><Link to="/"><FaSearch /> Buscar empleo</Link></li>
                    
                </ul>
            </div>
        </nav>

    </>
  )
}

export default Menu
