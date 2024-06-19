// src/utils/utils.js


const utils = {

    // borrar index del array
    delArrayIndex: (arrayToMod, indexToDelete) => {
        return arrayToMod.filter((_, index) => index !== indexToDelete);
    },

    //cambiar formato fecha de YYYY-MM-DD a DD-MM-YYYY
    cambiarFormatoFecha: (fecha)=> {
        const [anio, mes, dia] = fecha.split('-');
        return `${dia}-${mes}-${anio}`;
    },

    // Función para convertir la fecha al formato YYYY-MM-DD
    convertDate: (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Agrega un 0 si el mes es menor a 10
        const day = (`0${date.getDate() +1}`).slice(-2); // Agrega un 0 si el día es menor a 10
        return `${year}-${month}-${day}`;
    }

}

export default utils;