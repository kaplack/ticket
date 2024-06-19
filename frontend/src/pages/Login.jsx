import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        
    })

    const { email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(()=>{
      if(isError){
          toast.error(message)
      }
      
      //redirect when Logged in
      // if(isSuccess || user){
          
      //     navigate('/')
      // }
  
  },[isError, isSuccess, user, message, navigate, dispatch])

    const  onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
          email,
          password
        }

        dispatch(login(userData))
          .unwrap()
          .then(()=>{
              navigate('/')
          })
          .catch(toast.error)

    }

    if(isLoading){
      return <Spinner />
    }

  return (
    <>
            <div className="twm-sign-up" id="sign_up_popup2" aria-hidden="true" aria-labelledby="sign_up_popupLabel2" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {/* <form> */}
                        <form onSubmit={onSubmit} className="tab-pane fade show active" id="login-candidate">
                        <div className="modal-header">
                            <h2 className="modal-title" id="sign_up_popupLabel2">Ingresar</h2>
                            <p>Inicia sesión y accede a nuestra plataforma.</p>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /> */}
                        </div>
                        <div className="modal-body">
                            <div className="twm-tabs-style-2">
                                <div className="tab-content" id="myTab2Content">
                                    {/*Login Candidate Content*/}
                                    
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder='Ingresa tu correo' required />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder='Ingresa tu password' required />
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-12">
                                                <div className="form-group mb-3">
                                                    <div className=" form-check">
                                                        <input type="checkbox" className="form-check-input" id="Password3" />
                                                        <label className="form-check-label rem-forgot" htmlFor="Password3">Remember me <a href="#">Forgot Password</a></label>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-md-12">

                                                <button type="submit"
                                                    className="site-button"
                                                    
                                                >
                                                    Iniciar Sesión
                                                </button>

                                                <div className="mt-3 mb-3">¿No tienes una cuenta?
                                                    <a href="/register"> Click aquí.</a>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        
                        </form>
                        {/* </form> */}
                        {/* <div className="modal-footer">
                            <span className="modal-f-title">Login or Sign up with</span>
                            <ul className="twm-modal-social">
                                <li><a href="https://www.facebook.com/" className="facebook-clr"><i className="fab fa-facebook-f" /></a></li>
                                <li><a href="https://www.twitter.com/" className="twitter-clr"><i className="fab fa-twitter" /></a></li>
                                <li><a href="https://in.linkedin.com/" className="linkedin-clr"><i className="fab fa-linkedin-in" /></a></li>
                                <li><a href="https://www.google.com/" className="google-clr"><i className="fab fa-google" /></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div >
        </>
  )
}

export default Login
