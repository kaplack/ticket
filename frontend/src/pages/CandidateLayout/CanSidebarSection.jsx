import { useEffect, useState } from "react";
import userImg from "../../assets/img/user.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { update, getMe, reset } from "../../features/auth/authSlice";
import {toast} from 'react-toastify'

function CanSidebarSection() {
    
    const [selectedImage, setSelectedImage] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    
    const {_id, name, email, picture} = useSelector((state)=>state.auth.user)
    const [display, setDisplay] = useState(picture || userImg)
    const [userImage, setUserImage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        setDisplay(picture || userImg);
    }, [picture]); // Actualizar display cuando picture cambie
    
    const openFile = (e)=>{
        e.preventDefault()
        console.log("Get file path")
        document.getElementById("file-uploader").click();
    }
    // Función para previsualizar la imagen seleccionada por el usuario
  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setSelectedImage(true);
    setUserImage(file)  
    
  };

  const onSubmit = (e)=>{
    e.preventDefault()
    
    const formData = new FormData()
    //formData.append('userId', _id)
    formData.append('picture', userImage)

    dispatch(update(formData))
    .unwrap()
            .then(()=>{
                setSelectedImage(false)
                dispatch(reset())
                dispatch(getMe())
                navigate('/profile/candidate')
                toast.success()
            })
            .catch(toast.error)

  };

    return (
        <>
            {/* <form  action={"/api/users/"+_id}  method="put" encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="twm-candidate-profile-pic">
                <img src={previewImage || display} alt="user picture" />
                    
                        <div className="upload-btn-wrapper">
                            <div id="upload-image-grid">
                            {!selectedImage ? (
                                <button className="site-button button-sm" onClick={openFile}>Editar</button>
                            ):(
                                <button className="site-button button-sm" type="submit">Guardar</button>
                            )}
                            
                            <input type="file" name="myfile" id="file-uploader" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                            </div>
                        </div>
                
                    
                </div> 
            </form> */}
            <div className="twm-mid-content text-center">
                <NavLink to={"/"} className="twm-job-title">
                    <h4>{name}</h4>
                </NavLink>
                <p>{email}</p>
            </div>
            <div className="twm-nav-list-1">
                <ul>
                    
                    <li >
                        <NavLink to={""}><i className="fa fa-user" />
                            Perfil
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to={"resume"}><i className="fa fa-user" />
                            Curriculum
                        </NavLink>
                    </li>
                   
                </ul>
            </div>
        </>
    )
}

export default CanSidebarSection;