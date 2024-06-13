import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import { createProfile } from "../features/candidate/canSlice"
import { createEmpProfile } from "../features/employer/empSlice"
import Spinner from "../components/Spinner"

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        profile: '',
        password: '',
        password2: ''
    })

    const { email, phone, profile, password, password2} = formData

const dispatch = useDispatch()
const navigate = useNavigate()

const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

useEffect(()=>{
    if(isError){
        toast.error(message)
    }
    
    //redirect when Logged in
    if(isSuccess || user){
        
        navigate('/')
    }

    //dispatch(reset())

},[isError, isSuccess, user, message, navigate, dispatch])

    const  onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                email,
                phone,
                profile,
                password
            }

            dispatch(register(userData))
                .then((successData)=>{
                    // console.log("Register return success Data: ", successData.payload._id )
                    // console.log("Register test: ", user._id)
                    const fd = new FormData()
                    fd.append('user', successData.payload._id)
                    if(profile === 'Candidate'){
                        dispatch(createProfile(fd))
                    }else{
                        dispatch(createEmpProfile(fd))
                    }
                    
                })
                .catch((error)=>{
                    toast.error(error.message)
                })
        }
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
            <div className="fippla_reg twm-sign-up"  aria-hidden="true" aria-labelledby="sign_up_popupLabel" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={onSubmit}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="sign_up_popupLabel">Registro</h2>
                                <p>Registrate y accede a toda la plataforma</p>
                            </div>
                            <div className="modal-body">
                                <div className="twm-tabs-style-2">
                                    <div className='form-group' required>
                        
                                            <select
                                            className="form-control"
                                            name='profile'
                                            id='profile'
                                            value={profile}
                                            onChange={onChange}
                                            required
                                            >
                                            <option value='' selected="true" disabled="disabled">selecciona tu perfil</option>
                                            <option value='Candidate'>Candidato</option>
                                            <option value='Employer'>Empleador</option>
                                        </select>
                                    </div>
                                    <div className="tab-content" id="myTabContent">
                                        {/*Signup Candidate Content*/}
                                        <div className="tab-pane fade show active" id="sign-candidate">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                    <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder='Ingresa tu email' required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                    <input type="text" className="form-control" id='phone' name='phone' value={phone} onChange={onChange} placeholder='Ingresa tu celular' required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                    <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder='Ingresa tu password' required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                    <input type="password" className="form-control" id='password2' name='password2' value={password2} onChange={onChange} placeholder='Confirma tu password' required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                        <div className=" form-check">
                                                            {/*<input type="checkbox" className="form-check-input" id="agree1" />
                                                             <label className="form-check-label" htmlFor="agree1">I agree to the <a href="#">Terms and conditions</a></label> */}
                                                            <p>¿Ya estás registrado?
                                                                <a href="/login"> Ingresa Aquí.</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="submit" className="site-button">Registrar</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* <div className="modal-footer">
                                <span className="modal-f-title">Login or Sign up with</span>
                                <ul className="twm-modal-social">
                                    <li><a href="https://www.facebook.com/" className="facebook-clr"><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href="https://www.twitter.com/" className="twitter-clr"><i className="fab fa-twitter" /></a></li>
                                    <li><a href="https://in.linkedin.com/" className="linkedin-clr"><i className="fab fa-linkedin-in" /></a></li>
                                    <li><a href="https://www.google.com/" className="google-clr"><i className="fab fa-google" /></a></li>
                                </ul>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>

        </>
  )
}

export default Register
