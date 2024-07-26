import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import PublicWorkList from "../components/PublicWorkList"
import HowItWorks from "../components/Home/HowItWorks"
import Banner from "../components/Home/Banner"
import JobCategories from "../components/Home/JobCategories"
import JobList from "../components/JobList/JobList"
import Footer from "../components/Footer"
import { NavLink } from "react-router-dom"

function Home() {



  return (
    <>
        <div className="page-content">
          <Banner />
        </div>
        
        
      
        <HowItWorks />

        <JobCategories />
      
        <div className="section-full p-t120 p-b90 site-bg-light-purple twm-bg-ring-wrap">
                <div className="twm-bg-ring-right" />
                <div className="twm-bg-ring-left" />
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head center wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Todos los puestos</div>
                        </div>
                        <h2 className="wt-title">Encuentra el empleo que te mereces</h2>
                    </div>
                    {/* title="" END*/}
                    <JobList />
                      <div className="text-center m-b30">
                          <NavLink to="/works" className=" site-button">Ver todos los trabajos</NavLink>
                      </div>
                    </div>
            </div>
            {/* JOB POST END */}
      
    </>
  )
}

export default Home
