import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {updateProfile, canGetProfile, delCvFile} from '../../features/candidate/canSlice'
import {toast} from 'react-toastify'
import { getMe } from '../../features/auth/authSlice'
import { FaDeleteLeft } from "react-icons/fa6";

function CanProfilePage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // Referencia al input file
    const inputFileRef = useRef(null);

    useEffect(() => {
        dispatch(canGetProfile());
    }, [dispatch]);

    const {user} = useSelector((state)=> state.auth) 
    // const [editedProfile, setEditedProfile] = useState({})
    const {candidate} = useSelector((state)=>state.candidate)
    console.log(candidate.doc)
    
    // State del formulario del perfil
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [tipoDoc, setTipoDoc] = useState('');
    const [doc, setDoc] = useState('');
    const [phone, setPhone] = useState('');
    const [lang, setLang] = useState('');
    const [nationality, setNationality] = useState('');
    const [genre, setGenre] = useState('');
    const [age, setAge] = useState('');
    const [disability, setDisability] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [nivEduc, setNivEduc] = useState('');
    const [experience, setExperience] = useState('');
    const [professionalProfile, setProfessionalProfile] = useState('');
    const [cvFile, setCvFile] = useState(null);

    useEffect(() => {
        if (candidate) {
            setName(user.name || '');
            setEmail(user.email || '');
            setTipoDoc(candidate.tipoDoc || '');
            setDoc(candidate.doc || '');
            setPhone(candidate.phone || '');
            setLang(candidate.lang || '');
            setNationality(candidate.nationality || '');
            setGenre(candidate.genre || '');
            setAge(candidate.age || '');
            setDisability(candidate.disability || '');
            setDiagnosis(candidate.diagnosis || '');
            setCountry(candidate.country || '');
            setCity(candidate.city || '');
            setPostalCode(candidate.postalCode || '');
            setAddress(candidate.address || '');
            setNivEduc(candidate.nivEduc || '');
            setExperience(candidate.experience || '');
            setProfessionalProfile(candidate.professionalProfile || '');
        }
    }, [candidate, user]);

    const handleFile = (e) =>{
        console.log(e.target.files)
        setCvFile(e.target.files[0])
    }

    // Codigo que envia el form 
    const handleSaveChanges = (e) => {
        e.preventDefault()
        const formData = new FormData()
        //Informacion personal
        formData.append('tipoDoc', tipoDoc)
        formData.append('doc', doc)
        formData.append('phone', phone)
        formData.append('lang', lang)
        formData.append('nationality', nationality)
        formData.append('genre', genre)
        formData.append('age', age)
        formData.append('disability', disability)
        formData.append('diagnosis', diagnosis)
        //Residencia
        formData.append('country', country)
        formData.append('city', city)
        formData.append('postalCode', postalCode)
        formData.append('address', address)
        //curricular
        formData.append('nivEduc', nivEduc)
        formData.append('experience', experience)
        formData.append('professionalProfile', professionalProfile)
        
        // Verificar si hay un archivo adjunto en cvFile antes de agregarlo al FormData
        if (cvFile && cvFile.length !== 0 && cvFile != null) {
            formData.append('resume', cvFile);
        }
        //console.log(Object.keys(cvFile).length !== 0)
        // const objetoPlano = Object.fromEntries(formData.entries());
        // console.log(objetoPlano)
        dispatch(updateProfile(formData))
            .then((successData) => {
                console.log(successData)
                toast.success('perfil actualizado!');
                dispatch(canGetProfile());
                setCvFile("");
                inputFileRef.current.value = '';
            })
            .catch((error) => {
                toast.error(error.message || 'An error occurred while updating the work.');
            });
    };

    const handleDeleteFile = (fileId) => {
        dispatch(delCvFile(fileId)) // Envía la solicitud para eliminar el archivo con el ID proporcionado
            .then(() => {
                // Actualiza la interfaz de usuario después de la eliminación
                toast.success('Archivo eliminado exitosamente');
                dispatch(canGetProfile()); // Actualiza el perfil para reflejar los cambios
            })
            .catch((error) => {
                toast.error('Error al eliminar el archivo: ' + error.message);
            });
    };

  return (
    <>
            <form onSubmit={handleSaveChanges}>
                <div className="panel panel-default">
                    <div className="panel-heading wt-panel-heading p-a20">
                        <h4 className="panel-tittle m-a0">Información Personal</h4>
                    </div>
                    <div className="panel-body wt-panel-body p-a20 m-b30 ">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="name" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                                        <i className="fs-input-icon fa fa-user " />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>E-mail</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                        <i className="fs-input-icon fas fa-at" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Tipo de Documento de Identidad</label>
                                    <div className="ls-inputicon-box">
                                    <select
                                            className="form-control"
                                            name="tipoDoc"
                                            value={tipoDoc}
                                            onChange={(e)=>setTipoDoc(e.target.value)} // Manejar cambios de selección
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="DNI" selected={tipoDoc === "DNI" ? true : false}>DNI</option>
                                            <option value="Carnet de Extranjeria" selected={tipoDoc === "Carnet de Extranjeria" ? true : false}>Carnet de Extranjeria</option>
                                            <option value="Pasaporte" selected={tipoDoc === "Pasaporte" ? true : false}>Pasaporte</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Documento de identidad </label>
                                    <div className="ls-inputicon-box">
                                    <input className="form-control" name="doc" type="text" placeholder="40407898" value={doc} onChange={(e)=>setDoc(e.target.value)} />
                                        <i className="fs-input-icon fa fa-phone-alt" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Numero Telefonico</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="phone" type="text" placeholder="234-456-890" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                                        <i className="fs-input-icon fa fa-phone-alt" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Idioma</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="lang" type="text" placeholder="e.x English, Spanish" value={lang} onChange={(e)=>setLang(e.target.value)} />
                                        <i className="fs-input-icon fa fa-language" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Nacionalidad</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="nationality" type="text" placeholder="Perú" value={nationality} onChange={(e)=>setNationality(e.target.value)}  />
                                        <i className="fs-input-icon fa fa-border-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Genero</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="genre" type="text" placeholder="e.x English, Spanish" value={genre} onChange={(e)=>setGenre(e.target.value)} />
                                        <i className="fs-input-icon fa fa-language" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Edad</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="age" type="text" placeholder="18" value={age} onChange={(e)=>setAge(e.target.value)} />
                                        <i className="fs-input-icon fa fa-border-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Discapacidad</label>
                                    <div className="ls-inputicon-box">
                                    <select
                                            className="form-control"
                                            name="disability"
                                            value={disability}
                                            onChange={(e)=>setDisability(e.target.value)} // Manejar cambios de selección
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="Visual" selected={disability === "Visual" ? true : false}>Visual</option>
                                            <option value="Auditiva" selected={disability === "Auditiva" ? true : false}>Auditiva</option>
                                            <option value="Física" selected={disability === "Física" ? true : false}>Física</option>
                                            <option value="Visceral" selected={disability === "Visceral" ? true : false}>Visceral</option>
                                            <option value="Psíquica" selected={disability === "Psíquica" ? true : false}>Psíquica</option>
                                            <option value="Intelectual" selected={disability === "Intelectual" ? true : false}>Intelectual</option>
                                            <option value="Trastorno del Espectro Autista" selected={disability === "Trastorno del Espectro Autista" ? true : false}>Trastorno del Espectro Autista</option>
                                            <option value="Otro" selected={disability === "Otro" ? true : false}>Otro</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Diagnóstico</label>
                                    <textarea className="form-control" rows={3} value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)} defaultValue={"Greetings! when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."} />
                                </div>
                            </div>
                            <div className="panel-heading wt-panel-heading p-a20">
                                <h4 className="panel-tittle m-a0">Residencia</h4>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>País</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="country" type="text" placeholder="USA" value={country} onChange={(e)=>setCountry(e.target.value)}  />
                                        <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Ciudad</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="city" type="text" placeholder="Texas" value={city} onChange={(e)=>setCity(e.target.value)} />
                                        <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Código Postal</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="postalCode" type="text" placeholder={75462} value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} />
                                        <i className="fs-input-icon fas fa-map-pin" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Dirección</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="address" type="text" placeholder="1363-1385 Sunset Blvd Angeles, CA 90026 ,USA" value={address} onChange={(e)=>setAddress(e.target.value)} />
                                        <i className="fs-input-icon fas fa-map-marker-alt" />
                                    </div>
                                </div>
                            </div>
                            <div className="panel-heading wt-panel-heading p-a20">
                                <h4 className="panel-tittle m-a0">Información Curricular</h4>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Nivel Educativo</label>
                                    <div className="ls-inputicon-box">
                                        <select
                                            className="form-control"
                                            name="nivEduc"
                                            value={nivEduc}
                                            onChange={(e)=>setNivEduc(e.target.value)} // Manejar cambios de selección
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="Primaria" selected={nivEduc === "Primaria" ? true : false}>Primaria</option>
                                            <option value="Secundaria" selected={nivEduc === "Secundaria" ? true : false}>Secundaria</option>
                                            <option value="Universitaria" selected={nivEduc === "Universitaria" ? true : false}>Universitaria</option>
                                            <option value="Maestría" selected={nivEduc === "Maestría" ? true : false}>Maestría</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Años de experiencia laboral</label>
                                    <div className="ls-inputicon-box">
                                    <select
                                            className="form-control"
                                            name="experience"
                                            value={experience}
                                            onChange={(e)=>setExperience(e.target.value)} // Manejar cambios de selección
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="Sin Experiencia" selected={experience === "Sin Experiencia" ? true : false}>Sin Experiencia</option>
                                            <option value="1 año o menos" selected={experience === "1 año o menos" ? true : false}>1 año o menos</option>
                                            <option value="1 a 3 años" selected={experience === "1 a 3 años" ? true : false}>1 a 3 años</option>
                                            <option value="3 a 6 años" selected={experience === "3 a 6 años" ? true : false}>3 a 6 años</option>
                                            <option value="6 a más años" selected={experience === "6 a más años" ? true : false}>6 a más años</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Perfil Profesional</label>
                                    <textarea className="form-control" rows={3} value={professionalProfile} onChange={(e)=>setProfessionalProfile(e.target.value)} defaultValue={"Greetings! when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."} />
                                </div>
                            </div>
                            
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Adjunta tu CV</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="resume" type="file" onChange={handleFile} ref={inputFileRef} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Cv Cargado</label>
                                    <div className="ls-inputicon-box">
                                        {candidate.resume && candidate.resume.map((item) => (
                                            <div className='cv-box'>
                                                <a className='cv-box__link' key={item.fileName} href={item.relativePath} download={item.fileName} target="_blank" fileId={item._id} >{item.fileName}</a><br />
                                                <button className='cv-box__button' type="button" onClick={() => handleDeleteFile(item._id)}><FaDeleteLeft /></button>
                                                <br />
                                            </div>
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="text-left">
                                    <button type="submit" className="site-button">Guardar Cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
  )
}

export default CanProfilePage
