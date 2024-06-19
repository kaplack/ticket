import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, canGetProfile } from '../../features/candidate/canSlice';
import {updateResume, getResume} from '../../features/resume/resSlice'
import { toast } from 'react-toastify';
import SectionCanKeySkills from './resume/section-can-keyskills'
import SectionCanEmployment from './resume/section-can-employment';
import SectionCanEducation from './resume/section-can-education';

function CanResumePage() {
  const dispatch = useDispatch();
    const { resume } = useSelector((state) => state.resume);
    const {user} = useSelector((state)=> state.auth) 
        useEffect(() => {
                dispatch(getResume());
            }, [dispatch]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    

    useEffect(() => {
        if (resume) {
          setExperiences(resume.experiences);
          setSkills(resume.skills);
          setEducation(resume.education);
        } 
      }, [resume, user]);


    const handleSaveChanges = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('skills', JSON.stringify(skills));
        formData.append('education', JSON.stringify(education));
        formData.append('experiences', JSON.stringify(experiences));

        dispatch(updateResume(formData))
            .then(() => {
                toast.success('Experiencia laboral actualizada!');
                dispatch(getResume());
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
                    <SectionCanEducation education={education} setEducation={setEducation} />
                </div>
                <div className="panel panel-default mb-3">
                    <SectionCanEmployment experiences={experiences} setExperiences={setExperiences} />
                </div>
                <div className="text-left">
                    <button type="submit" className="site-button" onClick={handleSaveChanges}>Guardar Cambios</button>
                </div>
            </div>
        </div>  
        
        
      </>
        
    );
}

export default CanResumePage
