import React, { useEffect, useState } from 'react'
import {empGetAllProfile } from '../features/employer/empSlice'
import {getAllWorks } from "../features/work/workSlice"
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import utils from '../utils/utils';
import WorkDetailSidebar from '../components/WorkDetailSidebar';

function Work() {
    
    const [logo, setLogo] = useState('')
    const [cover, setCover] = useState('')
    const [workDetail, setWorkDetail] = useState([])
    const {workId} = useParams();
    const dispatch = useDispatch();
    //console.log("workId ", workId)
    useEffect(() => {
        dispatch(getAllWorks())
        dispatch(empGetAllProfile());
    }, []);

    const {allWorks} = useSelector((state)=> state.work)
    const {allEmployers} = useSelector((state)=> state.employer)
    
    
// Carga de variables al modificarse las estate employer y user
useEffect(() => {
    // if (allEmployers) {
    //     const emp = allEmployers.map((el)=>{
    //         el._id ===workId
    //     })
    //   setLogo(Array.isArray(employer.logo) && employer.logo[0] && employer.logo[0].relativePath && employer.logo.length > 0 ? employer.logo[0].relativePath : '');
    //   setCover(Array.isArray(employer.cover) && employer.cover[0] &&employer.cover[0].relativePath && employer.cover.length > 0 ? employer.cover[0].relativePath : '');
    // }

    if (allWorks){
        const work = allWorks.find((el) => el._id === workId);
        setWorkDetail(work || null);
        console.log("Work.js", work)
        if(allEmployers) {
            const employerinfo = allEmployers.find((el) => el.user === work.user)
            console.log("Work.js", employerinfo)
            setLogo( employerinfo && employerinfo.logo ? employerinfo.logo : '');
            setCover(employerinfo && employerinfo.cover ? employerinfo.cover : '');
    
        }
    }
}, [allEmployers, allWorks, workId]);

    // const logo = employer.logo[0].relativePath;
    // const cover = employer.cover[0].relativePath;

    if (!workDetail) {
        return <div>Loading...</div>;
    }

    const sidebarConfig = {
        showJobInfo: false,
        workDetail
    }
    return (
        <>
            <div className="section-full  p-t120 p-b90 bg-white">
                <div className="container">
                    {/* BLOG SECTION START */}
                    <div className="section-content">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                {/* Candidate detail START */}
                                <div className="cabdidate-de-info">
                                    <div className="twm-job-self-wrap">
                                        <div className="twm-job-self-info">
                                            <div className="twm-job-self-top">
                                                <div className="twm-media-bg">
                                                    <img src={cover || ""} alt="banner del empleador" className='emp__cover'/>
                                                    <div className="twm-jobs-category green"><span className="twm-bg-green">New</span></div>
                                                </div>
                                                <div className="twm-mid-content">
                                                    <div className="twm-media">
                                                        <img src={logo || ""} alt="logo de empleador" className='emp__logo'/>
                                                    </div>
                                                    <h4 className="twm-job-title">{workDetail.title || ""} , {workDetail.jobCategory} <span className="twm-job-post-duration">/ {utils.calcularDiferenciaDias(workDetail.iDate)*1 < 2 ? "Nueva Publicación" : "Publicado hace: " + utils.calcularDiferenciaDias(workDetail.iDate) + " días."  }</span></h4>
                                                    <p className="twm-job-address"><i className="feather-map-pin" />{workDetail.workPlace + ", " + workDetail.city + " - " + workDetail.country}</p>
                                                    <div className="twm-job-self-mid">
                                                        <div className="twm-job-self-mid-left">
                                                            {/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
                                                            <div className="twm-jobs-amount">{"S/" + workDetail.workPay + " Soles"} <span>/ Mensual</span></div>
                                                        </div>
                                                        <div className="twm-job-apllication-area">Finaliza: 
                                                            <span className="twm-job-apllication-date">{" " + utils.cambiarFormatoFecha(utils.convertDate(workDetail.fDate))}</span>
                                                        </div>
                                                    </div>
                                                    <div className="twm-job-self-bottom">
                                                        <a className="site-button" data-bs-toggle="modal" href="#apply_job_popup" role="button">
                                                            Aplicar
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="twm-s-title">Descripción:</h4>
                                    <p>{workDetail.description}
                                    </p>
                                    
                                    <h4 className="twm-s-title">Requisitos:</h4>
                                    
                                    <p>{workDetail.workRequire}</p>

                                    <h4 className="twm-s-title">Responsabilities:</h4>
                                    <p>{workDetail.workFunctions}</p>

                                    {/* <SectionShareProfile />
                                    <SectionJobLocation /> */}

                                    {/* <div className="twm-two-part-section">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <SectionOfficePhotos1 />
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <SectionOfficeVideo1 />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 rightSidebar">
                                <WorkDetailSidebar _config={sidebarConfig} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ApplyJobPopup /> */}
        </>
    )
}

export default Work;
