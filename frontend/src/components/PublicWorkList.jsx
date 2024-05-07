import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getAllWorks, reset} from '../features/work/workSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PublicWorkCard from './PublicWorkCard'
import PublicWorkPost from './PublicWorkPost'

function PublicWorkList() {
  
    const {allWorks} = useSelector((state)=>state.work)
    const [workContent, setWorkContent] = useState({})

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllWorks())
        .catch(toast.error)
    }, [dispatch])

    const cardClick = (work)=>{
      setWorkContent(work)
      console.log(work)
    }

  return (
    <div>
      <h2>Últimos empleos publicados</h2>
      <div className="pw">
        
        <div className="pw__list">
          <ul>
            {allWorks.map((work) => {
              return <li key={work._id} onClick={() => {cardClick(work)}}><PublicWorkCard  work={work} /> </li>
            })}
          </ul>
          
        </div>
        <div className="pw__content">
          <h2>Detalle de la oferta</h2>
          <div className="pw__content--box">
            {workContent.title ? (
              <>
              <PublicWorkPost publicWork={workContent} />
              </>
              
            ):(
              <>
                <div className="pw__content--text">
                  <p>Dale click a las ofertas laborales para visualizar el detalle</p>
                </div>
                
              </>
            )}
          </div>
          
          
        </div>
        
      </div>
        
    </div>
  )
}

export default PublicWorkList
