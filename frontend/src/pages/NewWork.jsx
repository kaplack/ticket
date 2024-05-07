import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createWork, reset } from "../features/work/workSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

function NewWork() {

    const {user} = useSelector((state)=> state.auth)

    const {isLoading, isError, isSuccess, message} = useSelector(
        (state)=> state.work
    )

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [workFunctions, setWorkFunctions] = useState('')
    const [workRequire, setWorkRequire] = useState('')
    const [workPay, setWorkPay] = useState('')
    const [workWay, setWorkWay] = useState('remoto')
    const [workPlace, setWorkPlace] = useState('')
    const [actTime, setActTime] = useState('')
    const [workStatus, setWorkStatus] = useState('publicado')
    const [active, setActive] = useState(true)
    

    const [minDate] = useState(getMinDate()); // Obtiene la fecha actual y establece como mínimo

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onSubmit = (e) => {
        e.preventDefault()
        
        dispatch(createWork({title, description, workFunctions, workRequire, workPay, workWay, workPlace, actTime, workStatus, active}))
            .unwrap()
            .then(()=>{
                navigate('/works')
                toast.success(workStatus)
            })
            .catch(toast.error)

    }

  function getMinDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()+1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <BackButton url='/' />
        <section className="heading">
            <h1>Publica un empleo</h1>
            <p>Estas a un paso de contratar a alguien diferente</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Empleo</label>
                    <input name="title" type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Breve Descripción</label>
                    <textarea name="description" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)}  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="workFunctions">Describe las funciones que realizaría</label>
                    <textarea name="workFunctions" className="form-control" value={workFunctions} onChange={(e)=>setWorkFunctions(e.target.value)}  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="workRequire">Requisitos</label>
                    <textarea name="workRequire" className="form-control" value={workRequire} onChange={(e)=>setWorkRequire(e.target.value)}  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="workPay">Sueldo mensual (opcional)</label>
                    <input name="workPay" type="number" className="form-control" value={workPay} onChange={(e)=>setWorkPay(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='workWay'>Forma de trabajo</label>
                        <select
                        name='workWay'
                        id='workWay'
                        value={workWay}
                        onChange={(e) => setWorkWay(e.target.value)}
                        >
                        <option value='remoto'>Remoto</option>
                        <option value='presencial'>Presencial</option>
                        <option value='hibrido'>Híbrido</option>
                    </select>
                </div>
                {workWay !== 'remoto' && (
                    <div className="form-group">
                    <label htmlFor="workPlace">Lugar de trabajo</label>
                    <input name="workPlace" type="text" className="form-control" value={workPlace} onChange={(e)=>setWorkPlace(e.target.value)} required/>
                </div>
                ) }
                
                <div className="form-group">
                    <label htmlFor="actTime">Hasta que fecha estará activa la publicación</label>
                    <input name="actTime" type="date" className="form-control" min={minDate} value={actTime} onChange={(e)=>setActTime(e.target.value)}  required/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Enviar</button>
                </div>
            </form>
            
        </section>

    </>
  )
}

export default NewWork
