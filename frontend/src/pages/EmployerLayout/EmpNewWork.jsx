import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createWork, updateWork, getWorks } from "../../features/work/workSlice";
import Spinner from "../../components/Spinner";
import utils from "../../utils/utils";
import { FaAddressCard, FaBorderAll, FaFileAlt, FaBusinessTime, FaUserEdit, FaUserGraduate, FaDollarSign, FaGlobeAmericas, FaMapMarkerAlt, FaAt, FaMapPin, FaRegCalendarAlt } from "react-icons/fa";

function EmpNewWork() {
    const { user } = useSelector((state) => state.auth);
    const { works, isLoading, isError, isSuccess, message } = useSelector((state) => state.work);

    const { workId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getWorks());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        title: '',
        jobCategory: '',
        workTime: '',
        workWay: '',
        experience: '',
        qualification: '',
        workPay: '',
        country: '',
        city: '',
        workPlace: '',
        description: '',
        contactMail: '',
        workFunctions: '',
        workRequire: '',
        iDate: '',
        fDate: '',
        actTime: '',
        workStatus: 'publicado',
        active: true
    });

    useEffect(() => {
        if (workId) {
            let workToEditI = works.find(work => work._id === workId);
            //console.log(workToEdit.iDate)
            const workToEdit = {
                ...workToEditI,
                iDate: utils.convertDate(workToEditI.iDate),
                fDate: utils.convertDate(workToEditI.fDate),

            }
            //workToEdit.iDate = utils.convertDate(workToEdit.iDate);
            //workToEdit.fDate = utils.convertDate(workToEdit.fDate);

            if (workToEdit) {
                setFormData(workToEdit);
            }
        } else {
            setFormData({
                title: '',
                jobCategory: '',
                workTime: '',
                workWay: '',
                experience: '',
                qualification: '',
                workPay: '',
                country: '',
                city: '',
                workPlace: '',
                description: '',
                contactMail: '',
                workFunctions: '',
                workRequire: '',
                iDate: '',
                fDate: '',
                actTime: '',
                workStatus: 'publicado',
                active: true
            })
        }
    }, [workId, works]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (workId) {
            // Lógica para actualizar el trabajo existente
            dispatch(updateWork({ ...formData, id: workId }))
                .unwrap()
                .then(() => {
                    navigate('/profile/employer/works');
                    toast.success('Trabajo actualizado');
                })
                .catch(toast.error);
        } else {
            // Lógica para crear un nuevo trabajo
            //console.log("crear work: ", formData)
            dispatch(createWork(formData))
                .unwrap()
                .then(() => {
                    navigate('/profile/Employer/works');
                    toast.success('Trabajo publicado');
                })
                .catch(toast.error);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="wt-admin-right-page-header clearfix">
                <h2>Publica un empleo</h2>
                <div className="breadcrumbs">
                    <a href="#">Home</a>
                    <a href="#">Dashboard</a>
                    <span>Formulario de publicación de empleo</span>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0"><i className="fa fa-suitcase" />Detalle del Empleo</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/*Job title*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Titulo del empleo</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="title" value={formData.title} type="text" onChange={handleChange} placeholder="Analista de desarrollo" required />
                                        <div className="fs-input-icon"><FaAddressCard /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Job Category*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Elige una categoria</label>
                                    <div className="ls-inputicon-box">
                                        <select className="form-control" name="jobCategory" value={formData.jobCategory} onChange={handleChange}>
                                            <option value="">Selecciona la categoría</option>
                                            <option value="Administrativo">Administrativo</option>
                                            <option value="Operario">Operario</option>
                                            <option value="Técnico">Técnico</option>
                                            <option value="Ejecutivo o Gerencial">Ejecutivo o Gerencial</option>
                                            <option value="Ventas y Marketing">Ventas y Marketing</option>
                                            <option value="Servicio al Cliente">Servicio al Cliente</option>
                                            <option value="Soporte Técnico">Soporte Técnico</option>
                                            <option value="Educación y Formación">Educación y Formación</option>
                                            <option value="Salud y Asistencia Social">Salud y Asistencia Social</option>
                                            <option value="Ingeniería">Ingeniería</option>
                                            <option value="Investigación y Desarrollo">Investigación y Desarrollo</option>
                                            <option value="Logística y Transporte">Logística y Transporte</option>
                                            <option value="Producción y Manufactura">Producción y Manufactura</option>
                                            <option value="Limpieza y Mantenimiento">Limpieza y Mantenimiento</option>
                                            <option value="Diseño y Creatividad">Diseño y Creatividad</option>
                                            <option value="Recursos Humanos">Recursos Humanos</option>
                                            <option value="Contabilidad y Finanzas">Contabilidad y Finanzas</option>
                                            <option value="Legal y Compliance">Legal y Compliance</option>
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
                                        <select className="form-control" name="workTime" value={formData.workTime} onChange={handleChange}>
                                            <option value="">Selecciona el tipo de empleo</option>
                                            <option value="tiempo-completo">Tiempo completo</option>
                                            <option value="medio-tiempo">Medio Tiempo</option>
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
                                        <select className="form-control" name="workWay" value={formData.workWay} onChange={handleChange}>
                                            <option value="">Selecciona la modalidad</option>
                                            <option value="Remoto">Remoto</option>
                                            <option value="Presencial">Presencial</option>
                                            <option value="Híbrido">Híbrido</option>
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
                                        <select className="form-control" name="experience" value={formData.experience} onChange={handleChange}>
                                            <option value="">Selecciona la experiencia</option>
                                            <option value="Sin experiencia">Sin Experiencia</option>
                                            <option value="1">1 año de experiencia</option>
                                            <option value="De 1 a 3">De 1 a 3 años de experiencia</option>
                                            <option value="De 3 a 5">De 3 a 5 años de experiencia</option>
                                            <option value="De 5 a más">De 5 a más años de experiencia</option>
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
                                        <select className="form-control" name="qualification" value={formData.qualification} onChange={handleChange}>
                                            <option value="">Selecciona la calificación</option>
                                            <option value="Primaria Completa">Primaria completa</option>
                                            <option value="Secundaria Completa">Secundaria completa</option>
                                            <option value="Técnica">Técnica</option>
                                            <option value="Universitaria">Universitaria</option>
                                            <option value="Maestria">Maestria</option>
                                        </select>
                                        <div className="fs-input-icon"><FaUserGraduate /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Pay Range*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Rango de pago</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" type="number" name="workPay" value={formData.workPay} onChange={handleChange}/>
                                        
                                        <div className="fs-input-icon"><FaDollarSign /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Country*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>País</label>
                                    <div className="ls-inputicon-box">
                                        <select className="form-control" name="country" value={formData.country} onChange={handleChange}>
                                            <option value="">Selecciona el país</option>
                                            {utils.countries.map(country => (
                                                <option key={country.code} value={country.name}>{country.name}</option>
                                            ))}
                                        </select>
                                        <div className="fs-input-icon"><FaGlobeAmericas /></div>
                                    </div>
                                </div>
                            </div>
                            {/*City*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Ciudad</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="city" value={formData.city} type="text" onChange={handleChange} placeholder="Ciudad" required />
                                        <div className="fs-input-icon"><FaMapMarkerAlt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Work Place*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Lugar de trabajo</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="workPlace" value={formData.workPlace} type="text" onChange={handleChange} placeholder="Lugar de trabajo" required />
                                        <div className="fs-input-icon"><FaMapPin /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Description*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Descripción del trabajo</label>
                                    <div className="ls-inputicon-box">
                                        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Descripción" required></textarea>
                                        <div className="fs-input-icon"><FaFileAlt /></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/*Functions*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Funciones del trabajo</label>
                                    <div className="ls-inputicon-box">
                                        <textarea className="form-control" name="workFunctions" value={formData.workFunctions} onChange={handleChange} rows="4" placeholder="Funciones del trabajo" required></textarea>
                                        <div className="fs-input-icon"><FaFileAlt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Requirements*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Requerimientos del trabajo</label>
                                    <div className="ls-inputicon-box">
                                        <textarea className="form-control" name="workRequire" value={formData.workRequire} onChange={handleChange} rows="4" placeholder="Requerimientos del trabajo" required></textarea>
                                        <div className="fs-input-icon"><FaFileAlt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Contact Mail*/}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Correo de contacto</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="contactMail" value={formData.contactMail} type="email" onChange={handleChange} placeholder="Correo de contacto" required />
                                        <div className="fs-input-icon"><FaAt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Initial Date*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Fecha de inicio</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="iDate" value={formData.iDate} type="date" onChange={handleChange} required />
                                        <div className="fs-input-icon"><FaRegCalendarAlt /></div>
                                    </div>
                                </div>
                            </div>
                            {/*Final Date*/}
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Fecha final</label>
                                    <div className="ls-inputicon-box">
                                        <input className="form-control" name="fDate" value={formData.fDate} type="date" onChange={handleChange} required />
                                        <div className="fs-input-icon"><FaRegCalendarAlt /></div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <button type="submit" className="site-button">Guardar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EmpNewWork;
