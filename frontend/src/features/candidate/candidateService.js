import axios from 'axios'


const API_URL = process.env.REACT_APP_API_URL+'/api/profile/candidate'

//CREATE PROFILE
const createProfile = async (profileData, token) => {
    const objetoPlano = Object.fromEntries(profileData.entries());
       console.log(objetoPlano)
    const config = {
        headers: {
           'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, profileData, config)

    return response.data
}

//CREATE PROFILE
const updateProfile = async (profileData, token) => {
    const objetoPlano = Object.fromEntries(profileData.entries());
       console.log("update: ", objetoPlano)
    const config = {
        headers: {
           'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL, profileData, config)

    return response.data
}

//DELETE CV FILE
const delCvFile = async (fileId, token) => {
    // const objetoPlano = Object.fromEntries(profileData.entries());
    //    console.log("update: ", objetoPlano)
    const config = {
        headers: {
           'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+fileId, config)

    return response.data
}

//get Profile
const canGetProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)


    return response.data
}


const canService = {
    createProfile,
    updateProfile,
    canGetProfile,
    delCvFile
}

export default  canService