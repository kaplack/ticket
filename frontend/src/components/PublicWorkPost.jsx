import React from 'react'

function PublicWorkPost({publicWork}) {


  return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <h2>{publicWork.title}</h2>
                <span className={`status status-${publicWork.workStatus}`}>
                {publicWork.workStatus}   
                </span>
            <p>
                Publicado el: {new Date(publicWork.createdAt).toLocaleString()}
            </p>
            
            <h3>{publicWork.workWay}</h3>
                {publicWork.workWay !== 'Remoto' && (
                    <h3>{publicWork.workPlace}</h3>
                )}
            <hr />
            <div className="ticket-desc">
                <h3>Descripción</h3>
                <p>{publicWork.description}</p>
                <h3>Funciones</h3>
                <p>{publicWork.workFunctions}</p>
                <h3>Requisitos</h3>
                <p>{publicWork.workRequire}</p>
                {publicWork.workPay && (
                    <>
                        <h3>Salario</h3>
                        <p>S/ {publicWork.workPay} Soles.</p>
                    </>
                )}
                <h3>Puedes postular hasta el {`${new Date(publicWork.actTime).toLocaleString('es-PE')}`}</h3>
            </div>
        </header>
    </div>
  )
}

export default PublicWorkPost
