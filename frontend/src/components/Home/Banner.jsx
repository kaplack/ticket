import React from 'react'
import bg_jobzilla from '../../assets/img/Home/bg_jobzilla.png'
import right_pic1 from '../../assets/img/Home/right-pic1.png'

function Banner() {
  return (
<>
    {/*Banner Start*/}
    {/* <div className="twm-home-9-banner-section" style={{ backgroundImage: `url(${publicUrlFor("images/home-9/banner-bg/pic1.jpg")})` }}> */}
    <div className="twm-home-9-banner-section" style={{ backgroundImage: `url(${bg_jobzilla})` }}>
    <div className="container">
        <div className="row">
            {/*Left Section*/}
            <div className="col-xl-7 col-lg-12 col-md-12">
                <div className="twm-bnr-left-section">
                    <div className="twm-bnr-title-large">
                        <span>¿Buscas un empleo?</span>
                        <span className="typewrite site-text-primary" data-period={2000} data-type="[ &quot;Dream Job&quot; , &quot;Next Job&quot;]" />
                        <div><span>Te ayudaremos!</span> </div>
                    </div>
                    {/* <div className="twm-bnr-search-bar">
                        <form>
                            <div className="row">
                                {/*Title*/}
                                {/* <div className="form-group col-xl-8 col-lg-8 col-md-8">
                                    <label>Dinos lo que buscas</label>
                                    <div className="twm-single-iput">
                                        <input name="username" type="text" required className="form-control  bg-none" placeholder="puesto, palabra clave o compañia" />
                                    </div>
                                </div> */}
                                {/*Find job btn*/}
                                {/*<div className="form-group col-xl-4 col-lg-4 col-md-4">
                                    <button type="button" className="site-button">Buscar empleo</button>
                                </div>
                            </div>
                        </form>
                    </div> */}
                    {/* <div className="twm-bnr-popular-search">
                        <span className="twm-title">Busquedas populares</span> */}
                        {/* <NavLink to={publicUser.jobs.LIST}>Developer</NavLink> ,
                        <NavLink to={publicUser.jobs.LIST}>Designer</NavLink> ,
                        <NavLink to={publicUser.jobs.LIST}>Architect</NavLink> ,
                        <NavLink to={publicUser.jobs.LIST}>Engineer</NavLink> ,
                        <NavLink to={publicUser.jobs.LIST}>PHP</NavLink> ,
                        <NavLink to={publicUser.jobs.LIST}>Banking</NavLink> ,
                        <NavLink to={publicUser.jobs.LIST}>Ios</NavLink> ,
                        <NavLink to={publicUser.jobs.LIST}>Accountancy</NavLink>... */}
                    {/* </div> */}
                </div>
            </div>
            {/*right Section*/}
            <div className="col-xl-5 col-lg-12 col-md-12 twm-bnr-right-section">
                <div className="twm-bnr-right-content">
                    <div className="bnr-media">
                        <img src={right_pic1} alt="" />
                    </div>
                    <div className="slider-thumb-wrap">
                        <div className="slider-thumb" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</>

  )
}

export default Banner
