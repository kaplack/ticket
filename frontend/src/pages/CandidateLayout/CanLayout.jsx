import { useState } from "react";
import CanSidebarSection from "./CanSidebarSection"
import CandidateRoutes from "./CandidateRoutes"
import { useLocation } from "react-router-dom";


function CandidateLayout() {
    const currentpath = useLocation().pathname;

    const [image, setImage] = useState(null);


    return (
        <>
            <div className="page-wraper">

               

                <div className="page-content">

                    <div className="section-full p-t120  p-b90 site-bg-white">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-12 rightSidebar m-b30">
                                    <div className="side-bar-st-1">
                                        <CanSidebarSection setImage={setImage}/>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-lg-8 col-md-12 m-b30">
                                    
                                    <CandidateRoutes picture={image} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
               

                {/* BUTTON TOP START */}
                <button className="scroltop"><span className="fa fa-angle-up  relative" id="btn-vibrate" /></button>

            </div>
        </>
    )
}

export default CandidateLayout;