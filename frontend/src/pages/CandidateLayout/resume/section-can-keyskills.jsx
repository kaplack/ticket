import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';
import { IoIosCloseCircle } from "react-icons/io";

function SectionCanKeySkills({skills = [], setSkills}) {

    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        // Validar si el input no está vacío
        if (newSkill.trim() !== '') {
            // Separar las comas y formar un array en el caso de tener más de una habilidad
            let newSkillArray = newSkill.split(',').map(skill => skill.trim());
            
            // Filtrar para eliminar habilidades vacías
            newSkillArray = newSkillArray.filter(skill => skill !== '');
            
            // Usar un Set para eliminar duplicados dentro de newSkillArray
            newSkillArray = [...new Set(newSkillArray)];

            // Filtrar para eliminar duplicados tanto de newSkillArray como de skills existentes
            newSkillArray = newSkillArray.filter(skill => !skills.includes(skill));
    
            // Guardar en el estado solo las habilidades únicas
            if (newSkillArray.length > 0) {
                setSkills([...skills, ...newSkillArray]);
                setNewSkill('');
            }
        }
    };

    const delSkill = (skillToDelete)=>{
        //console.log(skillToDelete)
        setSkills(skills.filter((_, index) => index !== skillToDelete));
    }

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Habilidades claves</h4>
                <a data-bs-toggle="modal" href="#Key_Skills" role="button" title="Edit" className="site-text-primary" >
                    <FaPlusCircle />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20 ">
                <div className="tw-sidebar-tags-wrap">
                    <div className="tagcloud">
                        
                            {skills.length === 0 ? (
                                <p>No hay habilidades claves agregadas.</p>
                            ):(
                                skills.map((skill, index)=>(
                                    <a key={index}>{skill} <span onClick ={() => delSkill(index)}><IoIosCloseCircle /></span> </a>
                                ))
                            )}
                        
                    </div>
                </div>
            </div>
            {/*Modal popup */}
            <div className="modal fade twm-saved-jobs-view" id="Key_Skills" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h2 className="modal-title">Habilidades Claves</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><IoMdClose /></button>
                            </div>
                            <div className="modal-body">
                                <p>It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.</p>
                                <div className="form-group">
                                    <input className="form-control" type="text" onChange={(e) => setNewSkill(e.target.value)} value={newSkill} required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="site-button" data-bs-dismiss="modal" onClick={handleAddSkill}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

SectionCanKeySkills.propTypes = {
    skills: PropTypes.array,
    setSkills: PropTypes.func.isRequired,
  };
  
export default SectionCanKeySkills;