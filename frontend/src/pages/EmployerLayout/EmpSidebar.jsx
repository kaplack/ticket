

import {FaAngleRight } from "react-icons/fa";
import { loadScript, setMenuActive } from "../../components/globals/constans";
//import { employer, empRoute, publicUser } from "../../../../globals/route-names";
import { useEffect, useState } from "react";
import { logout, reset } from '../../features/auth/authSlice';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import fipplaLogo from "../../assets/img/fipplaLogo2.png"

function EmpSidebarSection(props) {
    const currentpath = useLocation().pathname;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {employer} = useSelector((state)=>state.employer)

    const [logo, setLogo] = useState(null)

    useEffect(()=>{
        if(employer){
            setLogo(employer.logo && employer.logo.length > 0 ? employer.logo[0].relativePath : '');
        }
        
    },[employer])

    const elClick = (e) =>{
        console.log(e.target)
        console.log(e.currentTarget)
        const elements = document.querySelectorAll(".nav-element")

        Array.from(elements).map((el)=>{
            el.classList.remove("active")
        })

        e.currentTarget.classList.add("active")
        document.querySelector(".sub-menu").style.display = "none";
    }

    const displayBlock = (e) =>{
        if(!e.target.classList.contains("sub-menu__li")){
            elClick(e);
            const li = e.currentTarget;
            //console.log(e.target)
            li.classList.remove("active")
            
            const sub_menu = li.querySelector(".sub-menu")
            
            if(sub_menu.style.display === 'none'){
                sub_menu.style.display = 'block'
            }else{
                sub_menu.style.display = 'none'
            }
        }
        
        
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }
    //console.log(employer && employer.logo[0].relativePath)

    return (
        <>
            <nav id="sidebar-admin-wraper" className={props.sidebarActive ? "" : "active"}>
                <div className="page-logo">
                    <NavLink to="/"><img src={logo} alt="Logo de empleador" /></NavLink>
                </div>
                <div className="admin-nav scrollbar-macosx">
                    <ul>
                        <li
                            className="nav-element"
                            onClick={elClick}>
                            <NavLink className="prueba" to="/"><span className="admin-nav-text">Inicio</span></NavLink>
                        </li>
                        <li
                            className="nav-element"
                            onClick={elClick}>
                            <NavLink to="company-profile"><span className="admin-nav-text">Company Profile</span></NavLink>
                        </li>
                        <li
                            className="nav-element has-child" onClick={displayBlock}>
                                <a href="#" className="nav-element__element">
                                    <span className="admin-nav-text">Jobs</span>
                                    <FaAngleRight className="submenu-toggle"/>
                                </a>
                            <ul className="sub-menu" style={{display:"none"}}>
                                <li> <NavLink to="new-work" id="jobMenuId1"><span className="nav-element sub-menu__li admin-nav-text">Post a New Jobs</span></NavLink></li>
                                <li> <NavLink to="works" id="jobMenuId2"><span className="nav-element sub-menu__li admin-nav-text">Manage Jobs</span></NavLink></li>
                            </ul>
                        </li>
                        {/* <li className="nav-element">
                            <NavLink to="/candidates"><span className="admin-nav-text">Candidates</span></NavLink>
                        </li>
                        <li className="nav-element">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#delete-dash-profile"><span className="admin-nav-text">Delete Profile</span></a>
                        </li> */}
                        <li className="nav-element">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#logout-dash-profile" onClick={handleLogout}>
                                
                                <span className="admin-nav-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default EmpSidebarSection;