import { useEffect, useState } from "react";
import { DropzoneComponent } from "react-dropzone-component";
import {useNavigate} from 'react-router-dom'
import {updateProfile, empGetProfile} from '../../features/employer/empSlice'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { IoBusiness } from "react-icons/io5";
import defaultLogo from "../../assets/img/businessIcon.png";


function EmpProfilePage() {

  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(empGetProfile());
}, [dispatch]);

  const {user} = useSelector((state)=> state.auth)
  const {employer} = useSelector((state)=>state.employer)

  // const [savedLogo, setSavedLogo] = useState(null)
  // const [savedCover, setSavedCover] = useState(null)


  //formData variables/states
  const [logo, setLogo] = useState('')
  const [cover, setCover] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [compType, setCompType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [numCol, setNumCol] = useState('')
  const [description, setDescription] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [instagram, setInstagram] = useState('')
  const [youtube, setYoutube] = useState('')
  

  // Carga de variables al modificarse las estate employer y user
  useEffect(() => {
      if (employer) {
        setLogo(employer.logo && employer.logo.length > 0 ? employer.logo[0] : '');
        setCover(employer.cover && employer.cover.length > 0 ? employer.cover[0] : '');
          setCompanyName(employer.companyName || '');
          setPhone(user.phone || '');
          setEmail(user.email || '');
          setCompType(employer.compType || '');
          setIdNumber(employer.idNumber || '');
          setNumCol(employer.numCol || '');
          setDescription(employer.description || '');
          setFacebook(employer.facebook || '');
          setTwitter(employer.twitter || '');
          setLinkedin(employer.linkedin || '');
          setWhatsapp(employer.whatsapp || '');
          setInstagram(employer.instagram || '');
          setYoutube(employer.youtube || '');
      }
  }, [employer]);


  var componentConfig = {
    showFiletypeIcon: true,
    method:'put',
    postUrl: 'no-url'
  };

  const [youtubeFields, setYoutubeFields] = useState(0);
  const [vimeoFields, setVimeoFields] = useState(0);

  //
  const handleSubmit1 = (e) => {
    e.preventDefault()
    const formData = new FormData()
    //Información Básica
    if (logo && logo.length !== 0 && logo != null) {
      formData.append('logo', logo);
    }
    if (cover && cover.length !== 0 && cover != null) {
      formData.append('cover', cover);
    }
    formData.append('companyName', companyName)
    formData.append('idNumber', idNumber)
    formData.append('numCol', numCol)
    formData.append('compType', compType)
    formData.append('description', description)

    dispatch(updateProfile(formData))
      .then((successData) => {
          //console.log(successData)
          toast.success('perfil actualizado!');
          //dispatch(canGetProfile());
          //setCvFile("");
          //inputFileRef.current.value = '';
      })
      .catch((error) => {
          toast.error(error.message || 'An error occurred while updating the work.');
      });
  }

  // Función para previsualizar la imagen seleccionada por el usuario
  // y carga de sus respectivos States
  const handleImageChange = (e) => {

    const file = e.target.files[0];
    file.fieldName = e.target.name;
    console.log(file)
    if (file) {
      if(file.fieldName === 'logo'){ 
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewLogo(reader.result);
        };
        reader.readAsDataURL(file);
        setLogo(file)
      }else if(file.fieldName === 'cover'){
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewCover(reader.result);
        };
        reader.readAsDataURL(file);
        setCover(file)
      }
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault()
    const formData = new FormData()
    //Información Básica
    
    formData.append('facebook', facebook)
    formData.append('twitter', twitter)
    formData.append('linkedin', linkedin)
    formData.append('whatsapp', whatsapp)
    formData.append('instagram', instagram)
    formData.append('youtube', youtube)

    dispatch(updateProfile(formData))
      .then((successData) => {
          //console.log(successData)
          toast.success('perfil actualizado!');
          //dispatch(canGetProfile());
          //setCvFile("");
          //inputFileRef.current.value = '';
      })
      .catch((error) => {
          toast.error(error.message || 'An error occurred while updating the work.');
      });
  }

  

  return (
      <>
          <div className="wt-admin-right-page-header clearfix">
              <h2>Perfil de la empresa</h2>
              <div className="breadcrumbs"><a href="#">Home</a><a href="#">Dasboard</a><span>Company Profile!</span></div>
          </div>
          {/*Logo and Cover image*/}
          <div className="panel panel-default">
              <div className="panel-heading wt-panel-heading p-a20">
                  <h4 className="panel-tittle m-a0">Logo y banner de portada</h4>
              </div>
              <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
                  <div className="row">
                      <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                              <div className="dashboard-profile-pic">
                                  <div className="dashboard-profile-photo">
                                      <img src={previewLogo || logo.relativePath || defaultLogo} alt="" />
                                      <div className="upload-btn-wrapper">
                                          
                                          <button className="site-button button-sm">Subir Logo</button>
                                          <input type="file" name="logo" id="file-uploader" accept=".jpg, .jpeg, .png"  onChange={handleImageChange}/>
                                      </div>
                                  </div>
                                  <p><b>Logo de la compañia :- </b> Tamaño mínimo: 136 x 136 y archivos en formato .jpg &amp; .png</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                           <div className="dashboard-cover-pic">
                                <div className="dashboard-cover-photo add-relative">
                                    <img src={previewCover || cover.relativePath } alt="" />
                                    <div className="upload-btn-wrapper add-btn-empProfile">
                                        
                                        <button className="site-button button-sm">Subir Banner</button>
                                        <input type="file" name="cover" id="file-uploader" accept=".jpg, .jpeg, .png"  onChange={handleImageChange}/>
                                    </div>
                                </div>
                                <p><b>Imagen del Banner :- </b> Tamaño mínimo: 770 x 310 y archivos en formato .jpg &amp; .png</p>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*Basic Information*/}
          <div className="panel panel-default">
              <div className="panel-heading wt-panel-heading p-a20">
                  <h4 className="panel-tittle m-a0">Información Básica</h4>
              </div>
              <div className="panel-body wt-panel-body p-a20 m-b30 ">
                  <form onSubmit={handleSubmit1}>
                      <div className="row">
                          <div className="col-xl-4 col-lg-12 col-md-12">
                              <div className="form-group">
                                  <label>Razón Social</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control" name="company_name" type="text" placeholder="Devid Smith" value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
                                      <i className="fs-input-icon fa fa-user " />
                                  </div>
                              </div>
                          </div>
                          <div className="col-xl-4 col-lg-12 col-md-12">
                              <div className="form-group">
                                  <label>Teléfono</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control" name="phone" type="text" placeholder="(251) 1234-456-7890" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                      <i className="fs-input-icon fa fa-phone-alt" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-xl-4 col-lg-12 col-md-12">
                              <div className="form-group">
                                  <label>email</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control" name="email" type="email" placeholder="Devid@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                      <i className="fs-input-icon fa fa-envelope" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-xl-4 col-lg-12 col-md-12">
                          <div className="form-group">
                                    <label>Tipo de Compañia</label>
                                    <div className="ls-inputicon-box">
                                    <select
                                            className="form-control"
                                            name="compType"
                                            value={compType}
                                            onChange={(e)=>setCompType(e.target.value)} // Manejar cambios de selección
                                        >
                                            <option value='' disabled>Seleccione</option>
                                            <option value="Publica" selected={compType === "Publica" ? true : false}>Publica</option>
                                            <option value="Privada" selected={compType === "Privada" ? true : false}>Privada</option>
                                        </select>
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                          </div>
                          <div className="col-xl-4 col-lg-12 col-md-12">
                              <div className="form-group">
                                  <label>RUC</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control" name="idNumber" type="text" placeholder="Ingrese su múmero de RUC" value={idNumber} onChange={(e)=>setIdNumber(e.target.value)}/>
                                      <i className="fs-input-icon fa fa-globe-americas" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-xl-4 col-lg-12 col-md-12">
                              <div className="form-group city-outer-bx has-feedback">
                                  <label>Numero de trabajadores</label>
                                  <div className="ls-inputicon-box">
                                      <select 
                                        className="form-control" 
                                        name="numCol" 
                                        data-live-search="true" 
                                        title="team-size" 
                                        id="city" 
                                        data-bv-field="size"
                                        value={numCol} 
                                        onChange={(e)=>setNumCol(e.target.value)}
                                        >
                                          <option value='' disabled>Seleccione</option>
                                          <option value="5-10" selected={numCol === "5-10" ? true : false}>5-10</option>
                                          <option value="10-100" selected={numCol === "10-100" ? true : false}>10-100</option>
                                          <option value="101-350" selected={numCol === "101-350" ? true : false}>101-350</option>
                                          <option value="351-500" selected={numCol === "351-500" ? true : false}>351-500</option>
                                          <option value="500+" selected={numCol === "500+" ? true : false}>500+</option>
                                      </select>
                                      <i className="fs-input-icon fa fa-sort-numeric-up" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label>Descripción</label>
                                  <textarea className="form-control" name="description" rows={3} placeholder="Saludos! Somos una empresa con ideas innovadoras" value={description} onChange={(e)=>setDescription(e.target.value)} />
                              </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                              <div className="text-left">
                                  <button type="submit" className="site-button">Guardar cambios</button>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
          {/*Photo gallery*/}
          {/* <div className="panel panel-default">
              <div className="panel-heading wt-panel-heading p-a20">
                  <h4 className="panel-tittle m-a0">Photo Gallery</h4>
              </div>
              <div className="panel-body wt-panel-body p-a20 m-b30 ">
                  <div className="row">
                      <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                              <DropzoneComponent config={componentConfig} />
                          </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                          <div className="text-left">
                              <button type="submit" className="site-button">Guardar cambios</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div> */}
          
          {/*Social Network*/}
          <div className="panel panel-default">
              <div className="panel-heading wt-panel-heading p-a20">
                  <h4 className="panel-tittle m-a0">Social Network</h4>
              </div>
              <div className="panel-body wt-panel-body p-a20 m-b30 ">
                  <form onSubmit={handleSubmit2}>
                      <div className="row">
                          <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                  <label>Facebook</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control wt-form-control" name="facebook" type="text" placeholder="https://www.facebook.com/" value={facebook} onChange={(e) => {setFacebook(e.target.value)}}/>
                                      <i className="fs-input-icon fab fa-facebook-f" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                  <label>Twitter</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control wt-form-control" name="twitter" type="text" placeholder="https://twitter.com/" value={twitter} onChange={(e) => {setTwitter(e.target.value)}}/>
                                      <i className="fs-input-icon fab fa-twitter" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                  <label>linkedin</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control wt-form-control" name="linkedin" type="text" placeholder="https://in.linkedin.com/" value={linkedin} onChange={(e)=>{setLinkedin(e.target.value)}}/>
                                      <i className="fs-input-icon fab fa-linkedin-in" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                  <label>Whatsapp</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control wt-form-control" name="whatsapp" type="text" placeholder="https://www.whatsapp.com/" value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}/>
                                      <i className="fs-input-icon fab fa-whatsapp" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                  <label>Instagram</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control wt-form-control" name="instagram" type="text" placeholder="https://www.instagram.com/" value={instagram} onChange={(e)=>{setInstagram(e.target.value)}}/>
                                      <i className="fs-input-icon fab fa-instagram" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                  <label>Youtube</label>
                                  <div className="ls-inputicon-box">
                                      <input className="form-control wt-form-control" name="youtube" type="text" placeholder="https://www.youtube.com/" value={youtube} onChange={(e)=>{setYoutube(e.target.value)}}/>
                                      <i className="fs-input-icon fab fa-youtube" />
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                              <div className="text-left">
                                  <button type="submit" className="site-button">Save Changes</button>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </>
  )
}

export default EmpProfilePage
