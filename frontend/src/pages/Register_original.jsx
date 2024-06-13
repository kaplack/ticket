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
      <section className="heading">
        <h1><FaUser /> Registrate </h1>
        <p>Crea una cuenta</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" id='email' name='email' value={email} onChange={onChange} placeholder='Ingresa tu email' required />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id='phone' name='phone' value={phone} onChange={onChange} placeholder='Ingresa tu celular' required />
            </div>
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
            <div className="form-group">
                <input type="password" className="form-control" id='password' name='password' value={password} onChange={onChange} placeholder='Ingresa tu password' required />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id='password2' name='password2' value={password2} onChange={onChange} placeholder='Confirma tu password' required />
            </div>
            <div className="form-group">
                <button className="btn btn-block">Registrar</button>
            </div>
        </form>
      </section>
    </>
  )
}

export default Register
