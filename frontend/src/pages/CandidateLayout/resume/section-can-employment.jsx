import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";

function SectionCanEmployment({experiences=[], setExperiences}) {

    const [newExperience, setNewExperience] = useState({
        currentWork: "no",
    })

    const addExperience = () => {

        //declarar un state experienceStatus en boolean

        
        if(newExperience.designation){
                setExperiences([
                ...experiences,
                newExperience,
            ]);
            setNewExperience({
                description: "",
                designation:"",
                organization:"",
                idate:"",
                fdate:"",
                currentWork: "no",
            })
        }
    };

    function calcularAniosDeExperiencia(fechaInicio, fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        let anos = fin.getFullYear() - inicio.getFullYear();
        let meses = fin.getMonth() - inicio.getMonth();
        const dias = fin.getDate() - inicio.getDate();

        // Ajustar años y meses si el día o el mes no han pasado completamente
        if (meses < 0 || (meses === 0 && dias < 0)) {
            anos--;
            meses += 12;
        }

        // Ajustar meses si el día no ha pasado completamente
        if (dias < 0) {
            meses--;
        }

        if (anos > 0) {
            if (anos === 1) {
            return `${anos} año de experiencia`;
            } else {
            return `${anos} años de experiencia`;
            }
        } else {
            if (meses === 1) {
            return `${meses} mes de experiencia`;
            } else {
            return `${meses} meses de experiencia`;
            }
        }
    }
    const cambiarFormatoFecha=(fecha)=> {
        const [anio, mes, dia] = fecha.split('-');
        return `${dia}-${mes}-${anio}`;
    }


    const editExperience = (indexExperience) => {
        console.log(indexExperience)
        setNewExperience(experiences[indexExperience])
    }

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Experiencia Laboral</h4>
                <a data-bs-toggle="modal" href="#Employment" role="button" title="Edit" className="site-text-primary">
                    <FaPlusCircle />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20 ">
                <div className="twm-panel-inner">
                    {experiences && experiences.length === 0 ? (
                        <p>No hay experiencias laborales agregadas.</p>
                    ) : (
                    experiences.map((experience, index) => (
                        <div key={index} className="experience-group" skillIndex={index}>
                            <div className="skill-buttons">
                            <a data-bs-toggle="modal" href="#Employment" role="button" title="Edit" className="site-text-primary" onClick={()=>editExperience(index)}>
                                <FaEdit />
                            </a>
                                
                                <button><IoMdClose /></button>
                            </div>
                            <div className="form-group">
                                <p><b>{experience.designation}</b></p>
                            </div>
                            <div className="form-group">
                                <p>{experience.organization}</p>
                            </div>
                            <div className="form-group">
                                <p>Del {experience.idate ? cambiarFormatoFecha(experience.idate):''} al {experience.fdate ? cambiarFormatoFecha(experience.fdate):''}, {calcularAniosDeExperiencia(experience.idate,experience.fdate)}.</p>
                            </div>
                            <div className="form-group">
                                <p>{experience.description}</p>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </div>
            {/*Employment */}
            <div className="modal fade twm-saved-jobs-view" id="Employment" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h2 className="modal-title">Add Employment</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><IoMdClose /></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Your Designation</label>
                                            <div className="ls-inputicon-box">
                                                <input 
                                                    className="form-control" 
                                                    type="text" 
                                                    placeholder="Enter Your Designation"
                                                    value={newExperience.designation}
                                                    required
                                                    onChange={(e) =>
                                                        setNewExperience(prevState => ({
                                                          ...prevState,
                                                          designation: e.target.value
                                                        }))
                                                      }
                                                />
                                                <i className="fs-input-icon fa fa-address-card" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Your Organization</label>
                                            <div className="ls-inputicon-box">
                                                <input 
                                                    className="form-control" 
                                                    type="text" 
                                                    placeholder="Enter Your Organization"
                                                    value={newExperience.organization}
                                                    required
                                                    onChange={(e) =>
                                                        setNewExperience(prevState => ({
                                                          ...prevState,
                                                          organization: e.target.value
                                                        }))
                                                      }
                                                />
                                                <i className="fs-input-icon fa fa-building" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Is this your current company?</label>
                                            <div className="row twm-form-radio-inline">
                                                <div className="col-md-6">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio" 
                                                        name="flexRadioDefault" 
                                                        id="flexRadioDefault1" 
                                                        checked={newExperience.currentWork === "si"}
                                                        onChange={(e) =>
                                                            setNewExperience(prevState => ({
                                                              ...prevState,
                                                              currentWork: "si"
                                                            }))
                                                          }
                                                        />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Si
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input 
                                                        className="form-check-input"    
                                                        type="radio" 
                                                        name="flexRadioDefault" 
                                                        id="S_no" 
                                                        checked={newExperience.currentWork === "no"}
                                                        onChange={(e) =>
                                                            setNewExperience(prevState => ({
                                                              ...prevState,
                                                              currentWork: "no"
                                                            }))
                                                          }
                                                        />
                                                    <label className="form-check-label" htmlFor="S_no">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*Start Date*/}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Started Working From</label>
                                            <div className="ls-inputicon-box">
                                                <input 
                                                    className="form-control datepicker" 
                                                    data-provide="datepicker" 
                                                    name="company_since" 
                                                    type="date" 
                                                    required
                                                    //placeholder="mm/dd/yyyy" 
                                                    value={newExperience.idate}
                                                    onChange={(e) =>
                                                        setNewExperience(prevState => ({
                                                          ...prevState,
                                                          idate: e.target.value
                                                        }))
                                                      }
                                                    />
                                                <i className="fs-input-icon far fa-calendar" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*End Date*/}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Worked Till</label>
                                            <div className="ls-inputicon-box">
                                                <input 
                                                    className="form-control datepicker" 
                                                    data-provide="datepicker" 
                                                    name="company_since" 
                                                    type="date" 
                                                    value={newExperience.fdate}
                                                    //placeholder="mm/dd/yyyy" 
                                                    onChange={(e) =>
                                                        setNewExperience(prevState => ({
                                                          ...prevState,
                                                          fdate: e.target.value
                                                        }))
                                                      }
                                                />
                                                <i className="fs-input-icon far fa-calendar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-0">
                                            <label>Describe your Job Profile</label>
                                            <textarea 
                                                className="form-control" 
                                                rows={3} 
                                                placeholder="Describe your Job" 
                                                value={newExperience.description}
                                                required
                                                onChange={(e) =>
                                                    setNewExperience(prevState => ({
                                                      ...prevState,
                                                      description: e.target.value
                                                    }))
                                                  }
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="site-button" data-bs-dismiss="modal" onClick={addExperience}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SectionCanEmployment;