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
        const date = isoDate ? new Date(isoDate) : new Date();
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Agrega un 0 si el mes es menor a 10
        const day = (`0${date.getDate() +1}`).slice(-2); // Agrega un 0 si el día es menor a 10
        return `${year}-${month}-${day}`;
    },

    //Valida si la variable d es una instancia de Date diferente de NaN
    isValidDate: (d) => d instanceof Date && !isNaN(d),

    calcularDiferenciaDias: (fechaBase) => {
        // Convertir la fecha de la base de datos a un objeto de fecha
        const fechaBaseObjeto = new Date(fechaBase);
      
        // Obtener la fecha actual
        const fechaActual = new Date();
      
        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fechaActual - fechaBaseObjeto;
      
        // Convertir la diferencia a días
        const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
      
        return diferenciaDias;
      },

      

      //Array de objetos

      countries: [
        {code: 51, name: "Perú"}
      ],



}

export default utils;