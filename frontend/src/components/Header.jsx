import {FaSignInAlt, FaSignOutAlt, FaUser, FaSearch } from 'react-icons/fa'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice'
import fipplaLogo from "../assets/img/fipplaLogo2.png"

function Header() {

    const [menuActive, setMenuActive] = useState(false);

    function handleNavigationClick() {
        setMenuActive(!menuActive);
    }

    function handleSearchLinkClick(event) {
        document.querySelector('#search').classList.add('open');
        document.querySelector('#search > form > input[type="search"]').focus();
      }

      function handleSearchClose(event) {
        if (event.target === event.currentTarget || event.target.className === 'close') {
          event.currentTarget.classList.remove('open');
        }
      }
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const {user} = useSelector((state) => state.auth)
  
      const onLogout = () =>{
          dispatch(logout())
          dispatch(reset())
          navigate('/login')
      }

      const location = useLocation();

      const isEmployerRoute = location.pathname.startsWith('/profile/Employer');

    if (!isEmployerRoute)  {
        return (
            <>
                <div className="container">
                    <header className={"site-header header-full-width mobile-sider-drawer-menu " + (menuActive ? "active" : "")}>
                        <div className="sticky-header main-bar-wraper navbar-expand-lg">
                            <div className="main-bar">
                                <div className="container-fluid clearfix">
                                    <div className="logo-header">
                                        <div className="logo-header-inner logo-header-one">
                                            <NavLink to="/"><img src={fipplaLogo} alt="FIPPLA LOGO" /></NavLink>
                                        </div>
                                    </div>
                                    {/* NAV Toggle Button */}
                                    <button id="mobile-side-drawer"
                                        data-target=".header-nav"
                                        data-toggle="collapse"
                                        type="button"
                                        className="navbar-toggler collapsed"
                                        onClick={handleNavigationClick}
                                    >
                                        <span className="sr-only"></span>
                                        <span className="icon-bar icon-bar-first" />
                                        <span className="icon-bar icon-bar-two" />
                                        <span className="icon-bar icon-bar-three" />
                                    </button>
                                    {/* MAIN Nav */}
                                    <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
                                        <ul className=" nav navbar-nav">
                                            <li className="has-mega-menu"><NavLink to="/">Home</NavLink></li>
                                            <li className="has-child"><NavLink to="/works">Empleos</NavLink></li>
                                        </ul>
                                    </div>
                                    {/* Header Right Section */}
                                    <div className="extra-nav header-2-nav">
                                        <div className="extra-cell">
                                            <div className="header-search">
                                                <a href="#search" onClick={handleSearchLinkClick} className="header-search-icon"><FaSearch /></a>
                                            </div>
                                        </div>
                                        <div className="extra-cell">
                                            <div className="header-nav-btn-section">
                                                {user ? (
                                                    <>
                                                        <div className="twm-nav-btn-left">
                                                            <a className="twm-nav-sign-up" href={"/profile/" + user.profile} role="button">
                                                                <FaUser /> {user.email.split("@")[0]}
                                                            </a>
                                                        </div>
                                                        <div className="twm-nav-btn-left" onClick={onLogout}>
                                                            <a className="twm-nav-sign-up" role="button">
                                                                <FaSignOutAlt /> Salir
                                                            </a>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="twm-nav-btn-left">
                                                            <a className="twm-nav-sign-up" href="/register" role="button">
                                                                <FaUser /> Registrarse
                                                            </a>
                                                        </div>
                                                        <div className="twm-nav-btn-right">
                                                            <a className="twm-nav-post-a-job" href="/login" role="button">
                                                                <FaSignInAlt /> Ingresar
                                                            </a>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* SITE Search */}
                            <div id="search" onClick={handleSearchClose} onKeyUp={handleSearchClose}>
                                <span className="close" />
                                <form role="search" id="searchform" action="/search" method="get" className="radius-xl">
                                    <input className="form-control" name="q" type="search" placeholder="Type to search" />
                                    <span className="input-group-append">
                                        <button type="button" className="search-btn">
                                            <i className="fa fa-paper-plane" />
                                        </button>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </header>
                </div>
            </>
        ); 
      }
}

export default Header;