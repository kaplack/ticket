import {useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getWorks, reset} from '../../features/work/workSlice'
import Spinner from '../../components/Spinner'
import BackButton from '../../components/BackButton'
import WorkItem from '../../components/WorkItem'

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
      <BackButton url='/' />
      <h1>Empleos publicados</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Fecha</div>
          <div>Empleo</div>
          <div>Status</div>
          <div></div>
        </div>
        {works.map((work)=>{
          return <WorkItem key={work._id} work={work} />
        })}
      </div>
    </>
  )
}

export default EmpWorks
