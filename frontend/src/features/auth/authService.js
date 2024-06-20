import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL+'/api/users/'

//REGISTER USER
const register = async (userData) => {
    const response  = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//UPDATE USER
const update = async (updateData, token, userId) => {
    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    const response  = await axios.put(API_URL + userId, updateData, config)

    // if(response.data){
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    //console.log(JSON.stringify(response.data))
    return response.data
    //return updateData
    
}

//GET USER
const getMe = async (token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response  = await axios.get(API_URL + "me", config)

    // if(response.data){
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    console.log(JSON.stringify(response.data))
    return response.data
    //return updateData
    
}

//LOGIN USER
const login = async (userData) => {
    const response  = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => localStorage.removeItem('user')


const authService = {
    register,
    update,
    logout,
    login,
    getMe
}

export default  authService