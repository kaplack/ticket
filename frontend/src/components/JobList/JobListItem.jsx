import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'
import utils from '../../utils/utils'

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
    
    
    
    const numeroDias = utils.calcularDiferenciaDias(work.createdAt)

  return (
    <>
        <div className="twm-jobs-list-style1 mb-5">
            <div className="twm-media">
                <img src={work.logo} alt="logo empleador" />
            </div>
            <div className="twm-mid-content">
                <NavLink to={"/works/" + work._id} className="twm-job-title" >
                    
                    <h4>{work.title}<span className="twm-job-post-duration">/ hace {numeroDias} {numeroDias > 1 ? 'dias' : "día."}</span></h4>
                </NavLink>
                <p className="twm-job-address">{`${work.workWay + ", " + work.workPlace }`}</p>
                <a href={"https://"+work.web} className="twm-job-websites site-text-primary" target="_blank">{work.companyName}</a>
            </div>
            <div className="twm-right-content">
                {
                    numeroDias < 7 ? (
                        <div className="twm-jobs-category green"><span className="twm-bg-green">Nuevo</span></div>
                    ):(
                        <div className="twm-jobs-category green"><span className="twm-bg-green" style={{backgroundColor: "#fff" }}></span></div>
                    )

                }
                
                <div className="twm-jobs-amount">{work.workPay} soles <span>/ Mensuales</span></div>
                <NavLink to={"/works/" + work._id} className="twm-jobs-browse site-text-primary">Ver Empleo</NavLink>
            </div>
        </div>
    </>
  )
}

export default JobListItem
