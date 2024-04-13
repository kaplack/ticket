import {useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getAllWorks, reset} from '../features/work/workSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PublicWorkCard from './PublicWorkCard'

function PublicWorkList() {
  
    const {allWorks} = useSelector((state)=>state.work)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllWorks())
        .catch(toast.error)
    }, [dispatch])

  
  return (
    <div>
      <h2>Empleos publicados</h2>
        {allWorks.map((work) => {
            return <PublicWorkCard key={work._id} work={work} />
        })}
    </div>
  )
}

export default PublicWorkList
