import React from 'react'
import { FaUserCheck, FaCheck, FaPaperPlane, FaUpload, FaChalkboardTeacher } from "react-icons/fa";


     function HowItWorks() {
    return (
        <>
            <div className="section-full p-t120 p-b90 site-bg-white twm-how-it-work-area2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            {/* title="" START*/}
                            <div className="section-head left wt-small-separator-outer">
                                <div className="wt-small-separator site-text-primary">
                                    <div>¿Cómo funciona? </div>
                                </div>
                                <h2 className="wt-title">Sigue nuestros pasos, te ayudaremos!.</h2>
                            </div>
                            <ul className="description-list">
                                <li>
                                    <FaCheck />
                                    Seguridad &amp; Confianza
                                </li>
                                <li>
                                    <FaCheck />
                                    Trabajos en todo el Perú
                                </li>
                                <li>
                                    <FaCheck />
                                    No tiene costo o comisiones
                                </li>
                                <li>
                                    <FaCheck />
                                    Buenas empresas
                                </li>
                            </ul>
                            {/* title="" END*/}
                        </div>
                        <div className="col-lg-8 col-md-12">
                            <div className="twm-w-process-steps-2-wrap">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="twm-w-process-steps-2">
                                            <div className="twm-w-pro-top bg-clr-sky-light bg-sky-light-shadow">
                                                <span className="twm-large-number text-clr-sky">01</span>
                                                <div className="twm-media">
                                                    <span><FaUserCheck /></span>
                                                </div>
                                                <h4 className="twm-title">Registrate,<br />Crea una cuenta.</h4>
                                                <p>Necesitas una cuenta para poder conocerte.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="twm-w-process-steps-2">
                                            <div className="twm-w-pro-top bg-clr-yellow-light bg-yellow-light-shadow">
                                                <span className="twm-large-number text-clr-yellow">02</span>
                                                <div className="twm-media">
                                                    <span><FaUpload /></span>
                                                </div>
                                                <h4 className="twm-title">Sube <br />
                                                    tu cv a nuestra nube.</h4>
                                                <p>Conoceremos tus habilidades y podremos encontrar un puesto para ti.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="twm-w-process-steps-2">
                                            <div className="twm-w-pro-top bg-clr-pink-light bg-pink-light-shadow">
                                                <span className="twm-large-number text-clr-pink">03</span>
                                                <div className="twm-media">
                                                    <span><FaChalkboardTeacher /></span>
                                                </div>
                                                <h4 className="twm-title">Inducción <br />en el puesto de tu elección.</h4>
                                                <p>Te orientaremos y capacitaremos para alcanzar tu objetivo.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="twm-w-process-steps-2">
                                            <div className="twm-w-pro-top bg-clr-green-light bg-clr-light-shadow">
                                                <span className="twm-large-number text-clr-green">04</span>
                                                <div className="twm-media">
                                                    <span><FaPaperPlane /></span>
                                                </div>
                                                <h4 className="twm-title">Postula <br />al puesto de trabajo.</h4>
                                                <p>Postula al puesto de trabajo con nuestra ayuda y respaldo.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="twm-how-it-work-section">
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowItWorks;