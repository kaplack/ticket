import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+'/api/works/'
const PUBLIC_API_URL = process.env.REACT_APP_API_URL+'/api/allworks/'

// Create new work

const createWork = async (ticketData, token) => {
    console.log("workSlice: ", ticketData)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

// Get user works posts

const getWorks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,  config)

    return response.data
}

// Get user work

const getWork = async (workId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + workId,  config)

    return response.data
}

// Get public work

const getPublicWork = async (workId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+"/work/" + workId,  config)

    return response.data
}

// Delete user work

const deleteWork = async (workId, token) => {
    console.log("delete work: ", workId)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + workId,  config)

    return response.data
}

// Create new work

const updateWork = async (workData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + workData.id, workData, config)

    return response.data
}

// Get all works posts

const getAllWorks = async () => {
    const response = await axios.get(PUBLIC_API_URL)

    return response.data
}


const workService = {
    createWork,
    getWorks,
    getWork,
    updateWork,
    deleteWork,
    getAllWorks,
    getPublicWork
}

export default workService