import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {updateProfile, canGetProfile, delCvFile} from '../../features/candidate/canSlice'
import {toast} from 'react-toastify'
import { FaUser,FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import { Multiselect } from 'multiselect-react-dropdown';
import { IoIosCloseCircle } from "react-icons/io";
import utils from '../../utils/utils'

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
    //console.log(candidate.doc)
    
    // State del formulario del perfil
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tipoDoc, setTipoDoc] = useState('');
    const [doc, setDoc] = useState('');
    const [phone, setPhone] = useState('');
    // handle multiselector objects 
    const [selectedValues, setSelectedValues] = useState([]);
    const [lang, setLang] = useState([]);
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
            setName(candidate.name || '');
            setLastName(candidate.lastName || '');
            setTipoDoc(candidate.tipoDoc || '');
            setDoc(candidate.doc || '');
            setPhone(user.phone || '');

            // Convertir los idiomas del perfil en el formato necesario para el multiselect
            //let selectedLangs = [];
            if( candidate.lang && candidate.lang.length > 0) {
                setSelectedValues(candidate.lang.map((lang, index) => ({ name: lang, id: index + 1 })))
                } else {
                setSelectedValues([])
            };

            //setLang(selectedValues);
            
            //setLang(candidate.lang || '');
            setNationality(candidate.nationality || '');
            setGenre(candidate.genre || '');
            setAge(convertDate(candidate.age) || '');
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
        // Verificación de campos
    //const isValidDate = (d) => d instanceof Date && !isNaN(d);
    const ageDate = new Date(age);

    // Información personal
    if (name) formData.append('name', name);
    if (lastName) formData.append('lastName', lastName);
    if (tipoDoc) formData.append('tipoDoc', tipoDoc);
    if (doc) formData.append('doc', doc);
    if (lang && lang.length !== 0 && lang !== null) {
        formData.append('lang', JSON.stringify(lang)); // Convertir el array a JSON string
    }
    if (nationality) formData.append('nationality', nationality);
    if (genre) formData.append('genre', genre);
    if (utils.isValidDate(ageDate)) {
        formData.append('age', ageDate.toISOString());
    }
    if (disability) formData.append('disability', disability);
    if (diagnosis) formData.append('diagnosis', diagnosis);

    // Residencia
    if (country) formData.append('country', country);
    if (city) formData.append('city', city);
    if (postalCode) formData.append('postalCode', postalCode);
    if (address) formData.append('address', address);

    // Curricular
    if (nivEduc) formData.append('nivEduc', nivEduc);
    if (experience) formData.append('experience', experience);
    if (professionalProfile) formData.append('professionalProfile', professionalProfile);
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

    // Select Lang

    const [langOptions, setLangOptions] = useState([
        { name: 'Español', id: 1 },
        { name: 'Inglés', id: 2 },
        { name: 'Portugués', id: 3 },
        { name: 'Quechua', id: 4 },
        { name: 'Aymara', id: 5 },
      ]);


    const handleSelect = (selectedList) => {
        //setSelectedValues(selectedList);
        setLang(selectedList.map(item => item.name)); // Actualiza el estado de lang
      };
    
    const handleRemove = (selectedList) => {
        //setSelectedValues(selectedList);
        setLang(selectedList.map(item => item.name)); // Actualiza el estado de lang
    };

    // Función para convertir la fecha al formato YYYY-MM-DD
    const convertDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Agrega un 0 si el mes es menor a 10
        const day = (`0${date.getDate() +1}`).slice(-2); // Agrega un 0 si el día es menor a 10
        return `${year}-${month}-${day}`;
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
                                        <input className="form-control" name="name" type="text" value={name} onChange={(e)=>setName(e.target.value)} required/>
                                        <i className='fs-input-icon'><FaUser /></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Apellido</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="lastName" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
                                        <i className='fs-input-icon'><FaUser /></i>
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
                                            <option value="DNI" >DNI</option>
                                            <option value="Carnet de Extranjeria" >Carnet de Extranjeria</option>
                                            <option value="Pasaporte" >Pasaporte</option>
                                        </select>
                                        <i className='fs-input-icon'><FaAddressCard/></i>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Documento de identidad </label>
                                    <div className="ls-inputicon-box">
                                    <input className="form-control" name="doc" type="text" placeholder="40407898" value={doc} onChange={(e)=>setDoc(e.target.value)} />
                                    <i className='fs-input-icon'><FaAddressCard/></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Numero Telefonico</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="phone" type="text" placeholder="234-456-890" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                                        
                                        <i className='fs-input-icon'><FaPhoneAlt /></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Idioma</label>
                                    <div className="ls-inputicon-box">
                                    <Multiselect
                                        options={langOptions}
                                        displayValue="name"
                                        selectedValues={selectedValues}
                                        onSelect={handleSelect}
                                        onRemove={handleRemove}
                                        isObject={true}
                                        
                                        customCloseIcon={<span> <IoIosCloseCircle /></span>} // Custom close icon for selected items
                                    />
                                        
                                        {/* <i className='fs-input-icon'><FaPhoneAlt /></i> */}
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
                                        <select
                                            className="form-control"
                                            name="genre"
                                            value={genre}
                                            onChange={(e)=>setGenre(e.target.value)} // Manejar cambios de selección
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="Masculino" >Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Prefiero No decirlo" >Prefiero No decirlo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Fecha de Nacimiento</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="age" type="date" placeholder="18" value={age} onChange={(e)=>setAge(e.target.value)} />
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
                                            <option value="Visual" >Visual</option>
                                            <option value="Auditiva" >Auditiva</option>
                                            <option value="Física" >Física</option>
                                            <option value="Visceral" >Visceral</option>
                                            <option value="Psíquica" >Psíquica</option>
                                            <option value="Intelectual" >Intelectual</option>
                                            <option value="Trastorno del Espectro Autista" >Trastorno del Espectro Autista</option>
                                            <option value="Otro" >Otro</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Diagnóstico Específico</label>
                                    <textarea className="form-control" rows={3} value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)} />
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
                            {/* <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Código Postal</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="postalCode" type="text" placeholder={75462} value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} />
                                        <i className="fs-input-icon fas fa-map-pin" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Dirección</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="address" type="text" placeholder="1363-1385 Sunset Blvd Angeles, CA 90026 ,USA" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
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
                                            <option value="Primaria" >Primaria</option>
                                            <option value="Secundaria" >Secundaria</option>
                                            <option value="Técnica" >Técnica</option>
                                            <option value="Técnica Incompleta" >Técnica Incompleta</option>
                                            <option value="Universitaria" >Universitaria</option>
                                            <option value="Universitaria Incompleta" >Universitaria Incompleta</option>
                                            <option value="Maestría" >Maestría</option>
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
                                            <option value="Sin Experiencia" >Sin Experiencia</option>
                                            <option value="1 año o menos" >1 año o menos</option>
                                            <option value="1 a 3 años" >1 a 3 años</option>
                                            <option value="3 a 6 años" >3 a 6 años</option>
                                            <option value="6 a más años" >6 a más años</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Perfil Profesional</label>
                                    <textarea className="form-control" rows={3} value={professionalProfile} onChange={(e)=>setProfessionalProfile(e.target.value)}  />
                                </div>
                            </div>
                            
                            {/* <div className="col-xl-12 col-lg-12 col-md-12">
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
                            </div> */}
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
