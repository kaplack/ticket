import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, canGetProfile } from '../../features/candidate/canSlice';
import { toast } from 'react-toastify';
import SectionCanKeySkills from './resume/section-can-keyskills'
import SectionCanEmployment from './resume/section-can-employment';

function CanResumePage() {
  const dispatch = useDispatch();
    const { candidate } = useSelector((state) => state.candidate);

    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        if (candidate && Array.isArray(candidate.experience)) {
          setExperiences(candidate.experience);
        } else {
          setExperiences([]);
        }
      }, [candidate]);

    const handleAddExperience = () => {
        setExperiences([
            ...experiences,
            { startDate: '', endDate: '', company: '', sector: '', duties: '' },
        ]);
    };

    const handleExperienceChange = (index, field, value) => {
        const newExperiences = [...experiences];
        newExperiences[index][field] = value;
        setExperiences(newExperiences);
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('experience', JSON.stringify(experiences));

        dispatch(updateProfile(formData))
            .then((successData) => {
                toast.success('Experiencia laboral actualizada!');
                dispatch(canGetProfile());
            })
            .catch((error) => {
                toast.error(error.message || 'Error al actualizar la experiencia laboral.');
            });
    };

    return (
      <>
        <div className="col-xl-9 col-lg-8 col-md-12 m-b30">
            <div className="twm-right-section-panel site-bg-gray">
                <div className="panel panel-default mb-3">
                    <SectionCanKeySkills skills={skills} setSkills={setSkills}/>
                </div>
                <div className="panel panel-default mb-3">
                    <SectionCanEmployment experiences={experiences} setExperiences={setExperiences} />
                </div>
                
            </div>
        </div>  
        
        <form onSubmit={handleSaveChanges}>
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Experiencia Laboral</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30">
                    {experiences && experiences.length === 0 ? (
                        <p>No hay experiencias laborales agregadas.</p>
                    ) : (
                    experiences.map((experience, index) => (
                        <div key={index} className="experience-group">
                            <div className="form-group">
                                <label>Fecha de Inicio</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={experience.startDate}
                                    onChange={(e) =>
                                        handleExperienceChange(index, 'startDate', e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Fecha de Fin</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={experience.endDate}
                                    onChange={(e) =>
                                        handleExperienceChange(index, 'endDate', e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Empresa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={experience.company}
                                    onChange={(e) =>
                                        handleExperienceChange(index, 'company', e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Sector</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={experience.sector}
                                    onChange={(e) =>
                                        handleExperienceChange(index, 'sector', e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Funciones</label>
                                <textarea
                                    className="form-control"
                                    value={experience.duties}
                                    onChange={(e) =>
                                        handleExperienceChange(index, 'duties', e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    ))
                    )}
                    <button type="button" className="site-button" onClick={handleAddExperience}>
                        Agregar Experiencia
                    </button>
                    <div className="text-left">
                        <button type="submit" className="site-button">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </form>
      </>
        
    );
}

export default CanResumePage
