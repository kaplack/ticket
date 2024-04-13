import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import PublicWorkList from "../components/PublicWorkList"

function Home() {



  return (
    <>
      <section className="heading">
        <h1>Necesitas ayuda?</h1>
        <p>Elige una opcion</p>
      </section>

      <section>
        <Link to='/new-work' className='btn btn-reverse btn-block'><FaQuestionCircle /> Publica un empleo</Link>
        <Link to='/works' className="btn btn-block"><FaTicketAlt /> Busco un empleo</Link>
      </section>
      
      <section>
        <PublicWorkList />
      </section>

    </>
  )
}

export default Home
