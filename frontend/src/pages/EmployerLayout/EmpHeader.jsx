
import { NavLink } from "react-router-dom";
import { FaRegEnvelope, FaRegBell, FaAngleLeft } from "react-icons/fa";
//import { empRoute, employer } from "../../../../globals/route-names";
import { useSelector } from "react-redux";
import defaultLogo from "../../assets/img/businessIcon.png";



function EmpHeaderSection(props) {
    const {user} = useSelector((state) => state.auth)
    return (
        <>
            <header id="header-admin-wrap" className="header-admin-fixed">
                {/* Header Start */}
                <div id="header-admin" className={props.sidebarActive ? "" : "active"}>
                    <div className="container">
                        {/* Left Side Content */}
                        <div className="header-left">
                            <div className="nav-btn-wrap">
                                <a className="nav-btn-admin" id="sidebarCollapse" onClick={props.onClick}>
                                    <FaAngleLeft />
                                </a>
                            </div>
                        </div>
                        {/* Left Side Content End */}
                        {/* Right Side Content */}
                        <div className="header-right">
                            <ul className="header-widget-wrap">
                                
                                {/*Account*/}
                                <li className="header-widget">
                                    <div className="dashboard-user-section">
                                        <div className="listing-user">
                                            <div className="dropdown">
                                                <a href="#" className="dropdown-toggle" id="ID-ACCOUNT_dropdown" data-bs-toggle="dropdown">
                                                    <div className="user-name text-black">
                                                        <span>
                                                            <img src={user.picture || defaultLogo} alt="user picture" />
                                                        </span>{user.name}
                                                    </div>
                                                </a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Right Side Content End */}
                    </div>
                </div>
                {/* Header End */}
            </header>

        </>
    )
}

export default EmpHeaderSection;