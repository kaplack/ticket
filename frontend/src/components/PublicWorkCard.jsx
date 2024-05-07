import React from 'react'
import { Link } from 'react-router-dom'

function PublicWorkCard({work}) {
  return (
    <>
        <div className="pw-card">
            <div className="pw-card__text">
                <h2>{work.title}</h2>
                <p>{work.description}</p>
            </div>
        </div>
    
    </>
  )
}

export default PublicWorkCard
