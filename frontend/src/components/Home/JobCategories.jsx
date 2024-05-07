import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDesignServices } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { VscSymbolOperator } from "react-icons/vsc";
import { RiCustomerService2Line } from "react-icons/ri";

function JobCategories() {
  return (
    <>
        {/* JOBS CATEGORIES SECTION START */}
        <div className="section-full p-t120 p-b90 site-bg-gray twm-job-categories-area2">
                {/* title="" START*/}
                <div className="section-head center wt-small-separator-outer">
                    <div className="wt-small-separator site-text-primary">
                        <div>Empleos por categorias</div>
                    </div>
                    <h2 className="wt-title">Elije la Categoria que prefieras</h2>
                </div>
                {/* title="" END*/}
                <div className="container">
                    <div className="twm-job-categories-section-2">
                        <div className="job-categories-style1 m-b30">
                            <div className="row">
                                {/* COLUMNS 1 */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                            <MdDesignServices />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">37 empleos</div>
                                            <NavLink to="#">Diseño Gráfico</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* COLUMNS 2 */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                        <BsPersonWorkspace />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">45 empleos</div>
                                            <NavLink to="#">Digitador</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* COLUMNS 3 */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                        <VscSymbolOperator />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">25 Empleos</div>
                                            <NavLink to="#">Excel</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* COLUMNS 4 */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                        <RiCustomerService2Line />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">110 empleos</div>
                                            <NavLink to="#">Servicio al cliente</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* COLUMNS 5 */}
                                {/* <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                            <div className="flaticon-bars" />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">9,185 Jobs</div>
                                            <NavLink to="#">Finance</NavLink>
                                        </div>
                                    </div>
                                </div>
                                {/* COLUMNS 6 */}
                                {/* <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                            <div className="flaticon-user" />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">3,205 Jobs</div>
                                            <NavLink to="#">Marketing</NavLink>
                                        </div>
                                    </div>
                                </div> */}
                                {/* COLUMNS 7 */}
                                {/* <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                            <div className="flaticon-computer" />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">2,100 Jobs</div>
                                            <NavLink to="#">Design &amp; Art</NavLink>
                                        </div>
                                    </div>
                                </div> */}
                                {/* COLUMNS 8 */}
                                {/* <div className="col-lg-3 col-md-6">
                                    <div className="job-categories-block-2 m-b30">
                                        <div className="twm-media">
                                            <div className="flaticon-coding" />
                                        </div>
                                        <div className="twm-content">
                                            <div className="twm-jobs-available">1,500 Jobs</div>
                                            <NavLink to="#">Web Development</NavLink>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="text-center job-categories-btn">
                            <NavLink to="#" className=" site-button">All Categories</NavLink>
                        </div>
                    </div>
                </div>
            </div>
    
    </>
  )
}

export default JobCategories
