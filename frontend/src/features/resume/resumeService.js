import axios from 'axios'


const API_URL = process.env.REACT_APP_API_URL+'/api/profile/candidate/resume'

//CREATE PROFILE
const createResume = async (infoData, token) => {
    const objetoPlano = Object.fromEntries(infoData.entries());
       console.log("ResumeSErvice", objetoPlano)
    const config = {
        headers: {
           'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, infoData, config)

    return response.data
}

//update PROFILE
const updateResume = async (infoData, token) => {
    try {
        // Asegurándonos de que infoData sea un FormData válido
        if (!(infoData instanceof FormData)) {
            throw new Error("infoData debe ser una instancia de FormData");
        }

        // Convertimos infoData a un objeto plano para depuración
        const objetoPlano = Object.fromEntries(infoData.entries());
        console.log("update: ", objetoPlano);

        // Configuración de los headers
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        };

        // Realizamos la solicitud PUT
        const response = await axios.put(API_URL, infoData, config);

        // Devolvemos los datos de la respuesta
        return response.data;
    } catch (error) {
        // Manejamos los errores y los mostramos en la consola
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error("Error en la respuesta del servidor:", error.response.data);
        } else if (error.request) {
            // La solicitud se hizo pero no se recibió respuesta
            console.error("No se recibió respuesta del servidor:", error.request);
        } else {
            // Algo pasó al configurar la solicitud
            console.error("Error configurando la solicitud:", error.message);
        }

        // Log adicional del error completo
        console.error("Error completo:", error.config);

        // Puedes lanzar el error para que sea manejado por la función que llama a updateResume
        throw error;
    }
}


//get Profile
const getResume = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)


    return response.data
}


const resumeService = {
    createResume,
    updateResume,
    getResume
}

export default  resumeService