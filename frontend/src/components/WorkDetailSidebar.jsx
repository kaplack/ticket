import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAddressCard, FaBorderAll, FaFileAlt,FaBusinessTime,FaUserEdit, FaUserGraduate,FaDollarSign, FaGlobeAmericas,FaMapMarkerAlt,FaUserTie,FaClock,FaSuitcase,FaVenusMars,FaMoneyBillWave,FaAt, FaMapPin, FaRegCalendarAlt } from "react-icons/fa";
import utils from "../utils/utils";

function WorkDetailSidebar({ _config }) {

    // useEffect(() => {
    //     dispatch(getWorks())
    //     dispatch(empGetProfile());
    // }, []);

    const {works} = useSelector((state)=> state.work)
    const {workId} = useParams();
    const workDetail = _config.workDetail

    return (
        <>
            <div className="side-bar mb-4">
                <div className="twm-s-info2-wrap mb-5">
                    <div className="twm-s-info2">
                        <h4 className="section-head-small mb-4">Información Básica</h4>
                        {/* <ul className="twm-job-hilites">
                            <li>
                                <i><FaRegCalendarAlt /></i> 
                                <span className="twm-title"> Publicado: {utils.cambiarFormatoFecha(utils.convertDate(workDetail.iDate))}</span>
                            </li>
                            <li>
                                <i><FaRegCalendarAlt /></i> 
                                <span className="twm-title"> Finaliza: {utils.cambiarFormatoFecha(utils.convertDate(workDetail.fDate))}</span>
                            </li>
                            <li>
                                <i className="fas fa-eye" />
                                <span className="twm-title">8160 Views</span>
                            </li>
                            <li>
                                <i className="fas fa-file-signature" />
                                <span className="twm-title">6 Applicants</span>
                            </li>
                        </ul> */}
                        <ul className="twm-job-hilites2">
                            <li>
                                <div className="twm-s-info-inner">
                                <i><FaRegCalendarAlt /></i>
                                    <span className="twm-title">Publicado el:</span>
                                    <div className="twm-s-info-discription">{utils.cambiarFormatoFecha(utils.convertDate(workDetail.iDate))}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i><FaMapMarkerAlt /></i>
                                    <span className="twm-title">Ubicación:</span>
                                    <div className="twm-s-info-discription">{workDetail.city+", "+workDetail.country}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i><FaUserTie /></i>
                                    <span className="twm-title">Empleo:</span>
                                    <div className="twm-s-info-discription">{workDetail.title}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i><FaClock /></i>
                                    <span className="twm-title">Experiencia:</span>
                                    <div className="twm-s-info-discription">{workDetail.experience}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i><FaSuitcase /></i>
                                    <span className="twm-title">Calificación:</span>
                                    <div className="twm-s-info-discription">{workDetail.qualification} </div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i><FaVenusMars /></i>
                                    <span className="twm-title">Genero preferente:</span>
                                    <div className="twm-s-info-discription">Both</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i><FaMoneyBillWave /></i>
                                    <span className="twm-title">Salario:</span>
                                    <div className="twm-s-info-discription">{workDetail.workPay} / Mensual</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className="widget tw-sidebar-tags-wrap">
                    <h4 className="section-head-small mb-4">Job Skills</h4>
                    <div className="tagcloud">
                        <a href="#">Html</a>
                        <a href="#">Python</a>
                        <a href="#">WordPress</a>
                        <a href="#">JavaScript</a>
                        <a href="#">Figma</a>
                        <a href="#">Angular</a>
                        <a href="#">Reactjs</a>
                        <a href="#">Drupal</a>
                        <a href="#">Joomla</a>
                    </div>
                </div> */}
            </div>

            {
                _config.showJobInfo &&
                <div className="twm-s-info3-wrap mb-5">
                    <div className="twm-s-info3">
                        <div className="twm-s-info-logo-section">
                            <div className="twm-media">
                                <img src="" alt="" />
                            </div>
                            <h4 className="twm-title">Senior Web Designer , Developer</h4>
                        </div>
                        <ul>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-building" />
                                    <span className="twm-title">Company</span>
                                    <div className="twm-s-info-discription">Software Development</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-mobile-alt" />
                                    <span className="twm-title">Phone</span>
                                    <div className="twm-s-info-discription">+291  560 56456</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-at" />
                                    <span className="twm-title">Email</span>
                                    <div className="twm-s-info-discription">thewebmaxdemo@gmail.com</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-desktop" />
                                    <span className="twm-title">Website</span>
                                    <div className="twm-s-info-discription">https://themeforest.net</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-map-marker-alt" />
                                    <span className="twm-title">Address</span>
                                    <div className="twm-s-info-discription">1363-1385 Sunset Blvd Angeles, CA
                                        90026 ,USA</div>
                                </div>
                            </li>
                        </ul>
                        <NavLink to="#" className=" site-button">Vew Profile</NavLink>
                    </div>
                </div>
            }
            
            {/* <SectionSideAdvert /> */}
        </>
    )
}

export default WorkDetailSidebar;