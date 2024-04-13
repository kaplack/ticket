import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {getWork,updateWork, reset} from '../features/work/workSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'


function Work() {

    const {work, isLoading, isSuccess, isError, message} = useSelector((state)=> state.work)
    const [isEditing, setIsEditing] = useState(false)
    const [editedWork, setEditedWork] = useState({
        title: '',
        // Agrega más campos según sea necesario
    });

    const [minDate] = useState(getMinDate()); // Obtiene la fecha actual y establece como mínimo


    const dispatch = useDispatch()
    const {workId} = useParams()

    useEffect(()=>{
        dispatch(getWork(workId))
        .unwrap()
        .catch(toast.error)
        
    }, [workId, dispatch])

    useEffect(()=>{
        setEditedWork({
            id:workId,
            title: work.title,
            workWay: work.workWay,
            description: work.description,
            workFunctions: work.workFunctions,
            workRequire: work.workRequire,
            workPay: work.workPay,
            actTime: work.actTime

            // Agrega más campos según sea necesario
            })
    }, [work, isEditing])

    const handleEdit = () =>{
        setIsEditing(!isEditing)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedWork((prevWork) => ({
            ...prevWork,
            [name]: value,
        }));
    }

    const handleSaveChanges = () => {
        dispatch(updateWork(editedWork))
            .then(() => {
                dispatch(getWork(workId))
                toast.success('Work updated successfully!');
                setIsEditing(false);

            })
            .catch((error) => {
                toast.error(error.message || 'An error occurred while updating the work.');
            });
    };

    function getMinDate(date) {
        let now = new Date();  
        if(date){
           now = new Date(date); 
        } 
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()+1).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

  return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <BackButton url={'/works'}/>
            <h2>
                    {isEditing ? (
                        <>
                            <div className="form-group">
                                <label htmlFor="titile">Convocatoria</label>
                                <input
                                    type="text"
                                    name="title"
                                    className='form-control'
                                    value={editedWork?.title || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                        
                    ) : (
                        work.title
                    )}  
                    
            </h2>
                <span className={`status status-${work.workStatus}`}>
                {work.workStatus}   
                </span>
            
            <p>
                Publicado el: {new Date(work.createdAt).toLocaleString()}
            </p>
            
            
            
            {isEditing ? (
                <>
                    <div className="form-group">
                    <label>Lugar de trabajo: </label>
                        <select
                            name="workWay"
                            value={editedWork.workWay}
                            onChange={handleInputChange}
                            className='form-control'
                        >
                            <option value="Remoto" selected={editedWork.workWay == 'Remoto'}>Remoto</option>
                            <option value="Presencial" selected={editedWork.workWay == 'Presencial'}>Presencial</option>
                            <option value="Híbrido" selected={editedWork.workWay == 'Híbrido'}>Híbrido</option>
                        </select>
                    </div>
                    
                    {editedWork.workWay !== 'Remoto' && (
                    <div className="form-group">
                        <label htmlFor="workPlace">Ubicado en:</label>
                        <input name="workPlace" type="text" className="form-control" value={editedWork?.workPlace || ''} onChange={handleInputChange} />
                    </div>
                    ) }
                </>
                ) :(
                <>
                    
                    <h3>{work.workWay}</h3>
                    {editedWork.workWay !== 'Remoto' && (
                        <h3>{work.workPlace}</h3>
                    )}
                </>
                
            )}
            
            <hr />
            <div className="ticket-desc">
                {isEditing ? (
                    <>
                        <div className="form-group">
                            <h3><label htmlFor="description">Breve Descripción</label></h3>
                            <textarea name="description" className="form-control" value={editedWork?.description} onChange={handleInputChange}  required/>
                        </div>
                        <div className="form-group">
                            <h3><label htmlFor="workFunctions">Describe las funciones que realizaría</label></h3>
                            <textarea name="workFunctions" className="form-control" value={editedWork?.workFunctions} onChange={handleInputChange}  required/>
                        </div>
                        <div className="form-group">
                            <h3><label htmlFor="workRequire">Requisitos</label></h3>
                            <textarea name="workRequire" className="form-control" value={editedWork?.workRequire} onChange={handleInputChange}  required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="workPay">Sueldo mensual (opcional)</label>
                            <input name="workPay" type="number" className="form-control" value={editedWork?.workPay} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="actTime">Hasta que fecha estará activa la publicación</label>
                            <input name="actTime" type="date" className="form-control" min={minDate} value={getMinDate(editedWork?.actTime)} onChange={handleInputChange} />
                        </div>
                    </>
                ):(
                    <>
                        <h3>Descripción</h3>
                        <p>{work.description}</p>
                        <h3>Funciones</h3>
                        <p>{work.workFunctions}</p>
                        <h3>Requisitos</h3>
                        <p>{work.workRequire}</p>
                        {work.workPay && (
                            <>
                                <h3>Salario</h3>
                                <p>S/ {work.workPay} Soles.</p>
                            </>
                        )}
                        <h3>Puedes postular hasta el {`${new Date(work.actTime).toLocaleString('es-PE')}`}</h3>
                    </>
                )}
                
                
                
                
                
            </div>
            <div className="edit-buttons">
                <button className='btn' onClick={handleEdit}>Editar</button>
                <button className='btn' onClick={handleSaveChanges}>Guardar</button>
            </div>
            
        </header>
      
    </div>
  )
}

export default Work
