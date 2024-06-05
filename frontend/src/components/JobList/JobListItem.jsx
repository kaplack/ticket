import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'

function JobListItem({work}) {

    //const {allEmployers} = useSelector((state)=>state.employer)
    //console.log(allEmployers)
    //const [empInfo, setEmpInfo] = useState({})
    // const info =[]; 
    // allEmployers.map((employer)=>{
    //     if(employer.user === work.user){
    //         return info = employer;
    //     }
    // })
    
    function calcularDiferenciaDias(fechaBase) {
        // Convertir la fecha de la base de datos a un objeto de fecha
        const fechaBaseObjeto = new Date(fechaBase);
      
        // Obtener la fecha actual
        const fechaActual = new Date();
      
        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fechaActual - fechaBaseObjeto;
      
        // Convertir la diferencia a días
        const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
      
        return diferenciaDias;
      }
    
    const numeroDias = calcularDiferenciaDias(work.createdAt)

  return (
    <>
        <div className="twm-jobs-list-style1 mb-5">
            <div className="twm-media">
                <img src="" alt="logo empleador" />
            </div>
            <div className="twm-mid-content">
                <NavLink to="/" className="twm-job-title">
                    
                    <h4>{work.title}<span className="twm-job-post-duration">/ hace {numeroDias} {numeroDias > 1 ? 'dias' : "día."}</span></h4>
                </NavLink>
                <p className="twm-job-address">{`${work.workWay + ", " + work.workPlace }`}</p>
                <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a>
            </div>
            <div className="twm-right-content">
                {
                    numeroDias < 7 ? (
                        <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                    ):(
                        <div className="twm-jobs-category green"><span className="twm-bg-green" style={{backgroundColor: "#fff" }}></span></div>
                    )

                }
                
                <div className="twm-jobs-amount">{work.workPay} soles <span>/ Mensuales</span></div>
                <NavLink to="/works" className="twm-jobs-browse site-text-primary">Browse Job</NavLink>
            </div>
        </div>
    </>
  )
}

export default JobListItem
