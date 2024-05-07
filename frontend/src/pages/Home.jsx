import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import PublicWorkList from "../components/PublicWorkList"
import HowItWorks from "../components/Home/HowItWorks"
import Banner from "../components/Home/Banner"
import JobCategories from "../components/Home/JobCategories"
import JobList from "../components/JobList/JobList"
import Footer from "../components/Footer"

function Home() {



  return (
    <>
        <div className="page-content">
          <Banner />
        </div>
        
        
      
        <HowItWorks />

        <JobCategories />
      
     
        <JobList />
      
    </>
  )
}

export default Home
