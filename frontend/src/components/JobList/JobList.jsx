import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getAllWorks, reset} from '../../features/work/workSlice'
import {empGetAllProfile} from '../../features/employer/empSlice'
import JobListItem from './JobListItem'
import { NavLink } from 'react-router-dom'


function JobList() {

  const [itemInfo,setItemInfo] =useState(null)
    const {allWorks} = useSelector((state)=>state.work)
    const {allEmployers} = useSelector((state)=>state.employer)
    
    //User,Puesto, FechaDePublicación, lugar, salarioMensual, empresa, webDeLaEmpresa 
    //modificar 


    const dispatch = useDispatch()
    useEffect(() => {
        let isMounted = true; // Para evitar actualizaciones después de desmontar
      
        dispatch(getAllWorks())
          .then(() => {
            if (isMounted) {
              // Aquí deberías actualizar el estado si es necesario
            }
          })
          .catch(error => {
            toast.error(error.message);
          });
      
        dispatch(empGetAllProfile())
          .then(() => {
            if (isMounted) {
              // Aquí deberías actualizar el estado si es necesario
            }
          })
          .catch(error => {
            toast.error(error.message);
          });
      
        return () => {
          isMounted = false; // Para evitar actualizaciones después de desmontar
        };
      }, [dispatch]);


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
