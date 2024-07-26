import {useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getWorks, reset} from '../../features/work/workSlice'
import Spinner from '../../components/Spinner'
import BackButton from '../../components/BackButton'
import WorkItem from '../../components/WorkItem'
import EmpWorkItem from './EmpWorkItem'
import { FaMapPin, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

function EmpWorks() {
    const {works, isLoading, isSuccess} = useSelector((state)=> state.work)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getWorks())
        .catch(toast.error)
    }, [dispatch])

    if(isLoading) {
        return <Spinner />
    }

    if(!works){
      return (
        <>
        <h1>Aún no has publicado.</h1>
        </>
      )
    }

  return (
    <>
            <div className="wt-admin-right-page-header clearfix">
                <h2>Manage Jobs</h2>
                <div className="breadcrumbs"><a href="#">Home</a><a href="#">Dasboard</a><span>Mis publicaciones</span></div>
            </div>
            {/*Basic Information*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0"><i className="fa fa-suitcase" /> Job Details</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                    <div className="twm-D_table p-a20 table-responsive">
                        <table id="jobs_bookmark_table" className="table table-bordered twm-bookmark-list-wrap">
                            <thead>
                                <tr>
                                    <th>Empleo</th>
                                    <th>Categoría</th>
                                    <th>Tipo</th>
                                    <th>Candidatos</th>
                                    <th>Publicado &amp; Finalizado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {works.map((work)=>{
                                  return <EmpWorkItem key={work._id} work={work}/>
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Empleo</th>
                                    <th>Categoría</th>
                                    <th>Tipo</th>
                                    <th>Candidatos</th>
                                    <th>Publicado &amp; Finalizado</th>
                                    <th>Acciones</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
  )
}

export default EmpWorks
