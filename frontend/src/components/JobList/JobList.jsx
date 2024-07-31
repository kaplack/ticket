import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getAllWorks, reset} from '../../features/work/workSlice'
import {empGetAllProfile} from '../../features/employer/empSlice'
import JobListItem from './JobListItem'
import { NavLink } from 'react-router-dom'


function JobList({jobsFiltered}) {

  //const [itemInfo,setItemInfo] =useState(null)
    const {allWorks} = useSelector((state)=>state.work)
    const {allEmployers} = useSelector((state)=>state.employer)
    
    //User,Puesto, FechaDePublicación, lugar, salarioMensual, empresa, webDeLaEmpresa 
    //modificar 

    let workWithImg = []    

    if(!jobsFiltered){

        // Verificar que `allEmployers` es un array antes de usar `reduce`
        const logoMap = Array.isArray(allEmployers)
        ? allEmployers.reduce((acc, employer) => {
            acc[employer.user] = {
              logo: employer.logo,
              companyName: employer.companyName,
              web: employer.web,
              tipo:employer.tipo
            };
            return acc;
          }, {})
        : {};

        // Verificar que `allWorks` es un array antes de usar `map`
        workWithImg = Array.isArray(allWorks)
        ? allWorks.map((work) => ({
            ...work,
            logo: logoMap[work.user]?.logo || null,
            companyName: logoMap[work.user]?.companyName || null,
            web: logoMap[work.user]?.web || null,
            tipo:logoMap[work.user]?.tipo || null,
          }))
        : [];

    }

    let worksList = jobsFiltered || workWithImg

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

      // Verificar que `allEmployers` es un array antes de usar `reduce`
  // const logoMap = Array.isArray(allEmployers)
  // ? allEmployers.reduce((acc, employer) => {
  //     acc[employer.user] = {
  //       logo: employer.logo,
  //       companyName: employer.companyName,
  //       web: employer.web
  //     };
  //     return acc;
  //   }, {})
  // : {};

// Verificar que `allWorks` es un array antes de usar `map`
// const workWithImg = Array.isArray(worksList)
//   ? worksList.map((work) => ({
//       ...work,
//       logo: logoMap[work.user]?.logo || null,
//       companyName: logoMap[work.user]?.companyName || null,
//       web: logoMap[work.user]?.web || null,
      
//     }))
//   : [];



  return (
    <>
    
            
                    {/* Section-content-start */}
                    <div className="section-content">
                        <div className="twm-jobs-list-wrap">
                            {worksList.length > 0 ? (
                                <ul>
                                    {worksList.map((work) => (
                                        <li key={work._id}>
                                            <JobListItem work={work} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No se han publicado trabajos aún.</p>
                            )}
                            
                        </div>
                    </div>
                    {/* Section-content-finish */}
                

    </>
  )
}

export default JobList
