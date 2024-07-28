import React from 'react';
import { FaSearch, FaMapPin } from "react-icons/fa";


function SectionJobsSidebar({_searchFiltered}) {

    const handleSearch = (e)=>{
        _searchFiltered.setSearchTerm(e.target.value)
    }

    const handleLocationSearch = (e) => {
        _searchFiltered.setLocationTerm(e.target.value);
      };

      const handleCategory = (e) => {
        _searchFiltered.setCategory(e.target.value);
      };

      const handleCompanyType = (e) => {
        
        //_searchFiltered.setCompanyType(e.target.value);
        console.log(e.target.value)
      };


    return (
        <>
            <div className="side-bar">
                <div className="sidebar-elements search-bx">
                    <form>
                        <div className="form-group mb-4">
                            <h4 className="section-head-small mb-4">Categoría</h4>
                            {/* <select className="wt-select-bar-large selectpicker" data-live-search="true" data-bv-field="size"> */}
                            <select className="wt-select-bar-large" value={_searchFiltered.category} onChange={handleCategory} >
                                <option value={""}>All Category</option>
                                <option value="Administrativo">Administrativo</option>
                                <option value="Operario">Operario</option>
                                <option value="Técnico">Técnico</option>
                                <option value="Ejecutivo o Gerencial">Ejecutivo o Gerencial</option>
                                <option value="Ventas y Marketing">Ventas y Marketing</option>
                                <option value="Servicio al Cliente">Servicio al Cliente</option>
                                <option value="Soporte Técnico">Soporte Técnico</option>
                                <option value="Educación y Formación">Educación y Formación</option>
                                <option value="Salud y Asistencia Social">Salud y Asistencia Social</option>
                                <option value="Ingeniería">Ingeniería</option>
                                <option value="Investigación y Desarrollo">Investigación y Desarrollo</option>
                                <option value="Logística y Transporte">Logística y Transporte</option>
                                <option value="Producción y Manufactura">Producción y Manufactura</option>
                                <option value="Limpieza y Mantenimiento">Limpieza y Mantenimiento</option>
                                <option value="Diseño y Creatividad">Diseño y Creatividad</option>
                                <option value="Recursos Humanos">Recursos Humanos</option>
                                <option value="Contabilidad y Finanzas">Contabilidad y Finanzas</option>
                                <option value="Legal y Compliance">Legal y Compliance</option>
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <h4 className="section-head-small mb-4">Palabra clave</h4>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={handleSearch} placeholder="Job title or Keyword" />
                                <button className="btn" type="button"><FaSearch /></button>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <h4 className="section-head-small mb-4">Ubicación</h4>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={handleLocationSearch} placeholder="Search location" />
                                <button className="btn" type="button"><FaMapPin /></button>
                            </div>
                        </div>
                        <div className="twm-sidebar-ele-filter">
                            <h4 className="section-head-small mb-4">Tipo de Empresa</h4>
                            <ul>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" name='companyType' className="form-check-input-sidebar" id="exampleCheck1" value="Pública" onChange={handleCompanyType}/>
                                        <label className="form-check-label-sidebar" htmlFor="exampleCheck1">Pública</label>
                                    </div>
                                    <span className="twm-job-type-count">09</span>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" name='companyType' className="form-check-input-sidebar" id="exampleCheck2" value="Privada" onChange={handleCompanyType}/>
                                        <label className="form-check-label-sidebar" htmlFor="exampleCheck2">Privada</label>
                                    </div>
                                    <span className="twm-job-type-count">07</span>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="twm-sidebar-ele-filter">
                            <h4 className="section-head-small mb-4">Date Posts</h4>
                            <ul>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="exampleradio1" />
                                        <label className="form-check-label" htmlFor="exampleradio1">Last hour</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="exampleradio2" />
                                        <label className="form-check-label" htmlFor="exampleradio2">Last 24 hours</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="exampleradio3" />
                                        <label className="form-check-label" htmlFor="exampleradio3">Last 7 days</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="exampleradio4" />
                                        <label className="form-check-label" htmlFor="exampleradio4">Last 14 days</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="exampleradio5" />
                                        <label className="form-check-label" htmlFor="exampleradio5">Last 30 days</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="exampleradio6" />
                                        <label className="form-check-label" htmlFor="exampleradio6">All</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="twm-sidebar-ele-filter">
                            <h4 className="section-head-small mb-4">Type of employment</h4>
                            <ul>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="Freelance1" />
                                        <label className="form-check-label" htmlFor="Freelance1">Freelance</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="FullTime1" />
                                        <label className="form-check-label" htmlFor="FullTime1">Full Time</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="Intership1" />
                                        <label className="form-check-label" htmlFor="Intership1">Intership</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" id="Part-Time1" />
                                        <label className="form-check-label" htmlFor="Part-Time1">Part Time</label>
                                    </div>
                                </li>
                            </ul>
                        </div> */}
                    </form>
                </div>
                {/* <div className="widget tw-sidebar-tags-wrap">
                    <h4 className="section-head-small mb-4">Tags</h4>
                    <div className="tagcloud">
                        <NavLink to={publicUser.jobs.LIST}>General</NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Jobs </NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Payment</NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Application </NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Work</NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Recruiting</NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Employer</NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Income</NavLink>
                        <NavLink to={publicUser.jobs.LIST}>Tips</NavLink>
                    </div>
                </div> */}
            </div>
            {/* <SectionSideAdvert /> */}
        </>
    )
}

export default SectionJobsSidebar;