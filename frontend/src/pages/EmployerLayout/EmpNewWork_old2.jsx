import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createWork, reset } from "../../features/work/workSlice"
import Spinner from "../../components/Spinner"
import utils from "../../utils/utils"
import { FaAddressCard, FaBorderAll, FaFileAlt,FaBusinessTime,FaUserEdit, FaUserGraduate,FaDollarSign, FaGlobeAmericas,FaMapMarkerAlt,FaAt, FaMapPin, FaRegCalendarAlt } from "react-icons/fa";

function EmpNewWork() {
    const {user} = useSelector((state)=> state.auth)

    const {works, isLoading, isError, isSuccess, message} = useSelector(
        (state)=> state.work
    )

    const {workId} = useParams();
    
    console.log(workId)
    console.log(works)
    

    const [title, setTitle] = useState('')
    const [jobCategory, setJobCategory] = useState('')
    const [workTime, setWorkTime] = useState('')
    const [workWay, setWorkWay] = useState('')
    const [experience, setExperience] = useState('')
    const [qualification, setQualification] = useState('')
    const [workPay, setWorkPay] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [workPlace, setWorkPlace] = useState('')
    const [description, setDescription] = useState('')
    const [contactMail, setContactMail] = useState('')
    const [workFunctions, setWorkFunctions] = useState('')
    const [workRequire, setWorkRequire] = useState('')
    const [iDate, setIDate] =useState('')
    const [fDate, setFDate] =useState('')
    const [actTime, setActTime] = useState('')
    const [workStatus, setWorkStatus] = useState('publicado')
    const [active, setActive] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const post = (e) => {
        e.preventDefault()
        setWorkStatus("publicado")
        // dispatch(createWork({title, description, workFunctions, workRequire, workPay, workWay, workPlace, actTime, workStatus, active}))
        dispatch(createWork({title, jobCategory, workTime, workWay, experience, qualification, workPay, country, city, workPlace, description, workRequire, workFunctions, contactMail, iDate, fDate, actTime, workStatus, active}))
            .unwrap()
            .then(()=>{
                navigate('/works')
                toast.success(workStatus)
            })
            .catch(toast.error)

    }

    const saveDraft = (e) => {
        e.preventDefault()
        setWorkStatus("borrador")
        //identificar work para actualizar su estado
        // dispatch(createWork({title, description, workFunctions, workRequire, workPay, workWay, workPlace, actTime, workStatus, active}))
        dispatch(createWork({title, jobCategory, workTime, workWay, experience, qualification, workPay, country, city, workPlace, description, contactMail, iDate, fDate, actTime, workStatus, active}))
            .unwrap()
            .then(()=>{
                navigate('/works')
                toast.success(workStatus)
            })
            .catch(toast.error)

    }


    if(isLoading){
        return <Spinner />
    }

  return (
    <>
            <div className="wt-admin-right-page-header clearfix">
                <h2>Publica un empleo</h2>
                <div className="breadcrumbs"><a href="#">Home</a><a href="#">Dasboard</a><span>Fornulario de publicación de empleo</span></div>
            </div>
            
            {/*Basic Information*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0"><i className="fa fa-suitcase" />Detalle del Empleo</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                    <form>
                        <div className="row">
                            {/*Job title*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Titulo del empleo</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="title" value={title} type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Analista de desarrollo" required/>
                                        <div className="fs-input-icon"><FaAddressCard/></div>
                                    </div>
                                </div>
                            </div>
                            {/*Job Category*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Elige una categoria</label>
                                    <div className="ls-inputicon-box">
                                        <select className="form-control"  title="" id="j-category" value={jobCategory} onChange={((e)=>setJobCategory(e.target.value))}>
                                            <option value>Selecciona la categoría</option>
                                            <option value="administrativo">Administrativo</option>
                                            <option value="operario">Operario</option>
                                            <option value="tecnico">Técnico</option>
                                            {/* <option value="profesional">Profesional</option> */}
                                            <option value="ejecutivo">Ejecutivo / Gerencial</option>
                                            {/* <option value="gerencial">Gerencial</option> */}
                                            <option value="ventas-y-marketing">Ventas y Marketing</option>
                                            <option value="servicio-al-cliente">Servicio al Cliente</option>
                                            <option value="soporte-tecnico">Soporte Técnico</option>
                                            <option value="educacion-y-formacion">Educación y Formación</option>
                                            <option value="salud-y-asistencia-social">Salud y Asistencia Social</option>
                                            <option value="ingenieria">Ingeniería</option>
                                            <option value="investigacion-y-desarrollo">Investigación y Desarrollo</option>
                                            <option value="logistica-y-transporte">Logística y Transporte</option>
                                            <option value="produccion-y-manufactura">Producción y Manufactura</option>
                                            <option value="limpieza-y-mantenimiento">Limpieza y Mantenimiento</option>
                                            <option value="diseno-y-creatividad">Diseño y Creatividad</option>
                                            <option value="recursos-humanos">Recursos Humanos</option>
                                            <option value="contabilidad-y-finanzas">Contabilidad y Finanzas</option>
                                            <option value="legal-y-compliance">Legal y Compliance</option>
                                        </select>
                                        
                                        <div className="fs-input-icon"><FaBorderAll /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Job Type*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Tipo de empleo</label>
                                    <div className="ls-inputicon-box">
                                        <select 
                                            className="wt-select-box form-control" 
                                            value={workTime} 
                                            onChange={(e) => setWorkTime(e.target.value)}
                                            >
                                            <option className="bs-title-option" value>Selecciona el tipo de empleo</option>
                                            <option value="tiempo-completo">Tiempo completo</option>
                                            <option value="medio-tiempo" >Medio Tiempo</option>
                                            <option value="freelance">FreeLance</option>
                                            
                                        </select>
                                        <div className="fs-input-icon"><FaFileAlt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Work Way*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Modalidad</label>
                                    <div className="ls-inputicon-box">
                                    <select
                                        className="form-control"
                                        name='workWay'
                                        id='workWay'
                                        value={workWay}
                                        onChange={(e) => setWorkWay(e.target.value)}
                                        >
                                        <option className="bs-title-option" value>Selecciona la modalidad</option>
                                        <option value='Remoto'>Remoto</option>
                                        <option value='Presencial'>Presencial</option>
                                        <option value='Híbrido'>Híbrido</option>
                                    </select>
                                        <div className="fs-input-icon"><FaBusinessTime /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Experience*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Experiencia</label>
                                    <div className="ls-inputicon-box">
                                        <select
                                            className="form-control"
                                            name='experience'
                                            id='experience'
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            >
                                            <option className="bs-title-option" value>Selecciona la experiencia</option>
                                            <option value='Sin experiencia'>Sin Experiencia</option>
                                            <option value='1'>1 año de experiencia</option>
                                            <option value='De 1 a 3'>De 1 a 3 años de experiencia</option>
                                            <option value='De 3 a 5'>De 3 a 5 años de experiencia</option>
                                            <option value='De 5 a más'>De 5 a más años de experiencia</option>
                                        </select>
                                        <div className="fs-input-icon"><FaUserEdit /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Qualification*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Calificación</label>
                                    <div className="ls-inputicon-box">
                                        <select
                                            className="form-control"
                                            name='qualification'
                                            id='qualification'
                                            value={qualification}
                                            onChange={(e) => setQualification(e.target.value)}
                                            >
                                            <option className="bs-title-option" value>Selecciona la calificación</option>
                                            <option value='Primaria Completa'>Primaria completa</option>
                                            <option value='Secundaria Completa'>Secundaria completa</option>
                                            <option value='Técnica'>Técnica</option>
                                            <option value='Universitaria'>Universitaria</option>
                                            <option value='Maestria'>Maestria</option>
                                        </select>
                                        <div className="fs-input-icon"><FaUserGraduate /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Work Salary*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Salario Mensual</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="workPay" value={workPay} type="number" onChange={(e)=>setWorkPay(e.target.value)} placeholder="1200"/>
                                        <div className="fs-input-icon"><FaDollarSign /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Country*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>País</label>
                                    <div className="ls-inputicon-box">
                                        <select 
                                            className="wt-select-box form-control"
                                            name="country"
                                            value={country}
                                            onChange={(e)=>setCountry(e.target.value)}
                                            >
                                            <option className="bs-title-option" value>Selecciona el país</option>
                                            <option>Perú</option>
                                            
                                        </select>
                                        <div className="fs-input-icon"><FaGlobeAmericas /></div>
                                    </div>
                                </div>
                            </div>
                            {/*City*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Región o ciudad</label>
                                    <div className="ls-inputicon-box">
                                        <select 
                                            className="wt-select-box form-control"
                                            name="city"
                                            value={city}
                                            onChange={(e)=>setCity(e.target.value)} 
                                            >
                                                <option className="bs-title-option" value>Selecciona la ciudad</option>
                                                <option value="Amazonas">Amazonas</option>
                                                <option value="Ancash">Áncash</option>
                                                <option value="Apurimac">Apurímac</option>
                                                <option value="Arequipa">Arequipa</option>
                                                <option value="Ayacucho">Ayacucho</option>
                                                <option value="Cajamarca">Cajamarca</option>
                                                <option value="Callao">Callao</option>
                                                <option value="Cusco">Cusco</option>
                                                <option value="Huancavelica">Huancavelica</option>
                                                <option value="Huanuco">Huánuco</option>
                                                <option value="Ica">Ica</option>
                                                <option value="Junin">Junín</option>
                                                <option value="La-libertad">La Libertad</option>
                                                <option value="Lambayeque">Lambayeque</option>
                                                <option value="Lima">Lima</option>
                                                <option value="Loreto">Loreto</option>
                                                <option value="Madre-de-dios">Madre de Dios</option>
                                                <option value="Moquegua">Moquegua</option>
                                                <option value="Pasco">Pasco</option>
                                                <option value="Piura">Piura</option>
                                                <option value="Puno">Puno</option>
                                                <option value="San-martin">San Martín</option>
                                                <option value="Tacna">Tacna</option>
                                                <option value="Tumbes">Tumbes</option>
                                                <option value="Ucayali">Ucayali</option>
                                        </select>
                                        <div className="fs-input-icon"><FaMapMarkerAlt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Complete Address*/}
                            <div className="col-xl-12 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Dirección</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="workPlace" type="text" value={workPlace} onChange={(e)=>setWorkPlace(e.target.value)} placeholder="Calle Buena Ventura 123, Urb. Los Cilicios. Bellavista." />
                                        <div className="fs-input-icon"><FaMapPin /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Description*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description"
                                        rows={3} 
                                        placeholder="Describe lo que buscas en el colaborador, detalla su función principal y enumera las funciones adicionales." 
                                        value={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                        />
                                </div>
                            </div>
                            {/*workRequire*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Requisitos</label>
                                    <textarea 
                                        className="form-control" 
                                        name="workRequire"
                                        rows={3} 
                                        placeholder="Detalla los requisitos academicos o de experiencia que requieres para el puesto." 
                                        value={workRequire}
                                        onChange={(e)=>setWorkRequire(e.target.value)}
                                        />
                                </div>
                            </div>
                            {/*workFunctions*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Funciones</label>
                                    <textarea 
                                        className="form-control" 
                                        name="workFunctions"
                                        rows={3} 
                                        placeholder="Detalla las funciones del puesto." 
                                        value={workFunctions}
                                        onChange={(e)=>setWorkFunctions(e.target.value)}
                                        />
                                </div>
                            </div>
                            {/*Email Address*/}
                            <div className="col-xl-12 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>E-mail de contacto</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control" 
                                            name="contactMail" 
                                            type="email" 
                                            value={contactMail}
                                            onChange={(e)=>setContactMail(e.target.value)}
                                            placeholder="Devid@example.com" 
                                            />
                                        <div className="fs-input-icon"><FaAt /></div> 
                                    </div>
                                </div>
                            </div>
                            {/*Start Date*/}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Fecha de Inicio</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" value={iDate} onChange={(e)=>setIDate(e.target.value)} name="iDate" min={utils.convertDate()} type="date" placeholder="mm/dd/aaaa" />
                                        <div className="fs-input-icon"><FaRegCalendarAlt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*End Date*/}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Fecha Final</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" value={fDate} onChange={(e)=>setFDate(e.target.value)}  min={utils.convertDate(iDate)} name="fDate" type="date" placeholder="mm/dd/aaaa" />
                                        <div className="fs-input-icon"><FaRegCalendarAlt /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="text-left">
                                    <button type="submit" className="site-button m-r5" onClick={post}>Publicar empleo</button>
                                    {/* <button type="submit" className="site-button outline-primary" onClick={saveDraft}>Guardar borrador</button> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
  )
}

export default EmpNewWork
