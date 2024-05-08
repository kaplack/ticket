import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getAllWorks, reset} from '../../features/work/workSlice'
import JobListItem from './JobListItem'
import { NavLink } from 'react-router-dom'


function JobList() {

    const {allWorks} = useSelector((state)=>state.work)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllWorks())
        .catch(toast.error)
    }, [dispatch])

  return (
    <>
    
            <div className="section-full p-t120 p-b90 site-bg-light-purple twm-bg-ring-wrap">
                <div className="twm-bg-ring-right" />
                <div className="twm-bg-ring-left" />
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Todos los puestos</div>
                        </div>
                        <h2 className="wt-title">Encuentra el empleo que te mereces</h2>
                    </div>
                    {/* title="" END*/}
                    <div className="section-content">
                        <div className="twm-jobs-list-wrap">
                            {allWorks.length > 0 ? (
                                <ul>
                                    {allWorks.map((work) => (
                                        <li key={work._id}>
                                            <JobListItem work={work} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No se han publicado trabajos aún.</p>
                            )}
                            <div className="text-center m-b30">
                                <NavLink to="/works" className=" site-button">Ver todos los trabajos</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* JOB POST END */}

    </>
  )
}

export default JobList
