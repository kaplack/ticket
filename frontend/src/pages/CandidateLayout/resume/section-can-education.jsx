import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import utils from "../../../utils/utils";

function SectionCanEducation({education=[], setEducation}) {

    const [newEducation, setNewEducation] = useState({
        currentEducation:"no",
    })
    const [educEditIndex, setEducEditIndex] = useState()

    const addEducation = () => {

        //declarar un state experienceStatus en boolean
        if(educEditIndex>=0){
            if(newEducation.institute){
                setEducation( prev => 
                    prev.map((item, index)=>
                        index === educEditIndex ? newEducation : item
                    )
                );
                setNewEducation({
                    educLevel: "",
                    institute:"",
                    iyear:"",
                    fyear:"",
                    currentEducation:"no"
                })
                setEducEditIndex(-1)
            }

        }else{
            if(newEducation.institute){
                setEducation([
                ...education,
                newEducation,
                ]);
                setNewEducation({
                    educLevel: "",
                    institute:"",
                    iyear:"",
                    fyear:"",
                    currentEducation:"no"
                })
            }
        }
        
        
    };
    const closeEducModal = ()=>{
        //state edit en -1
        setEducEditIndex(-1)
        //set newexperience to nothing
        setNewEducation({
            educLevel: "",
            institute:"",
            iyear:"",
            fyear:"",
            currentEducation:"no"
        })
    }

    const editEducation = (indexEduc) => {
        console.log(indexEduc)
        setNewEducation(education[indexEduc])
        setEducEditIndex(indexEduc)
    }

    const delEduc= (educToDelete)=>{
        console.log(educToDelete)
        setEducation(prev => utils.delArrayIndex(prev, educToDelete));
    }

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Educación</h4>
                <a data-bs-toggle="modal" href="#Education" role="button" title="Edit" className="site-text-primary" onClick={closeEducModal}>
                    <FaPlusCircle />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20 ">
                <div className="twm-panel-inner">
                    {education && education.length === 0 ? (
                        <p>No agregaste tu educación</p>
                    ):(
                        education.map((educItem, index)=>(
                            <div key={index} className="resume-item">
                                <div className="topRight-buttons">
                                    <a data-bs-toggle="modal" href="#Education" role="button" title="Edit" className="site-text-primary" onClick={()=>editEducation(index)}>
                                        <FaEdit />
                                    </a>
                                    <a href="#Education" role="button" title="Edit" className="site-text-primary" onClick={()=>delEduc(index)}>
                                        <IoMdClose />
                                    </a>
                                </div>
                                <div className="form-group">
                                    <h5 className="resume-item__title">{educItem.educLevel}</h5>
                                </div>
                                <div className="resume-item__content">
                                    <div className="form-group">
                                        <p>{educItem.institute}</p>
                                    </div>
                                    <div className="form-group">
                                        <p>Del {educItem.iyear} al {educItem.fyear }.</p>
                                    </div>
                                    
                                </div>

                            </div>
                        ))
                    )}
                    {/* <p>Mention your employment details including your current and previous company work experience</p>
                    <p>2004 to 2006</p>
                    <p><b>BCA - Bachelor of Computer Applications</b></p>
                    <p>2006 to 2008</p>
                    <p><b>MCA - Master of Computer Application</b></p>
                    <p>2008 to 20011</p>
                    <p><b>Design Communication Visual</b></p>
                    <p><a className="site-text-primary" href="#">Add Doctorate/PhD</a></p>
                    <p><a className="site-text-primary" href="#">Add Masters/Post-Graduation</a></p>
                    <p><a className="site-text-primary" href="#">Add Graduation/Diploma</a></p> */}
                </div>
            </div>
            {/*Education */}
            <div className="modal fade twm-saved-jobs-view" id="Education" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h2 className="modal-title">Educación</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><IoMdClose /></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Educación</label>
                                            <div className="">
                                                <select 
                                                className="form-control" 
                                                data-live-search="true" 
                                                title="" 
                                                data-bv-field="size"
                                                value={newEducation.educLevel}
                                                onChange={(e) =>
                                                    setNewEducation(prevState => ({
                                                        ...prevState,
                                                        educLevel: e.target.value
                                                    }))
                                                    }
                                                >
                                                    <option className="bs-title-option" value>Selecciona el nivel de estudio</option>
                                                    <option >Primaria</option>
                                                    <option>Secundaria</option>
                                                    <option>Ténica</option>
                                                    <option>Ténica Incompleta</option>
                                                    <option>Universitaria</option>
                                                    <option>Universitaria Incompleta</option>
                                                </select>
                                                <i className="fs-input-icon fa fa-user-graduate" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Institución</label>
                                            <div className="ls-inputicon-box">
                                               <input 
                                               className="form-control" 
                                               type="text" 
                                               placeholder="Indica el colegio, instituto o universidad donde estudiaste"
                                               value={newEducation.institute}
                                               onChange={(e) =>
                                                    setNewEducation(prevState => ({
                                                        ...prevState,
                                                        institute: e.target.value
                                                    }))
                                                    }
                                                />
                                                <i className="fs-input-icon fa fa-book" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Año Inicio</label>
                                            <div className="ls-inputicon-box">
                                                <input  
                                                className="form-control" 
                                                type="number" 
                                                placeholder="2001"
                                                value={newEducation.iyear}
                                                onChange={(e) =>
                                                    setNewEducation(prevState => ({
                                                        ...prevState,
                                                        iyear: e.target.value
                                                    }))
                                                    }
                                                />
                                                <i className="fs-input-icon fas fa-book-reader" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Año final</label>
                                            <div className="ls-inputicon-box">
                                                <input  
                                                className="form-control" 
                                                type="number" 
                                                placeholder="2002"
                                                value={newEducation.fyear}
                                                onChange={(e) =>
                                                    setNewEducation(prevState => ({
                                                        ...prevState,
                                                        fyear: e.target.value
                                                    }))
                                                    }
                                                />
                                                <i className="fs-input-icon fas fa-book-reader" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal" onClick={closeEducModal}>Close</button>
                                <button type="button" className="site-button" data-bs-dismiss="modal" onClick={addEducation}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SectionCanEducation;