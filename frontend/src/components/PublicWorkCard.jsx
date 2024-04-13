import React from 'react'
import { Link } from 'react-router-dom'

function PublicWorkCard({work}) {
  return (
    <>
        <div className="card">
            <div className="card-text">
                <Link to={`/allworks/${work._id}`}><h2>{work.title}</h2></Link>
                <p>{work.description}</p>
            </div>
        </div>
    
    </>
  )
}

export default PublicWorkCard
