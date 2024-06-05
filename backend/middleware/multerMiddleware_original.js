const multer = require('multer');
const fs = require('fs');
const path = require('path');


// Obtener la fecha actual
// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const day = currentDate.getDate();
// const month = currentDate.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
// const hour = currentDate.getHours(); // Retorna la hora actual (en formato de 24 horas)
// const min = currentDate.getMinutes(); // Retorna los minutos actuales
// const sec = currentDate.getSeconds(); // Retorna los segundos actuales

try{
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11

    

    // Construir la ruta de destino
    const uploadPath = path.join(__dirname, '..', 'uploads', year.toString(), month.toString());

    // Ruta relativa para guardar los archivos
    const relativePath = `uploads/${year}/${month}`;

    // Verificar si la carpeta de destino existe, si no existe, crearla
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
    const hour = currentDate.getHours(); // Retorna la hora actual (en formato de 24 horas)
    const min = currentDate.getMinutes(); // Retorna los minutos actuales
    const sec = currentDate.getSeconds(); // Retorna los segundos actuales

    // Obtener el nombre original del archivo y su extensión
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);

    // Construir el nombre de archivo con la fecha como sufijo
    const uniqueFileName = `${path.basename(originalName, fileExtension)}_${hour}${min}${sec}${day}${month}${fileExtension}`;

    cb(null, uniqueFileName);
  }
});

const upload = multer({ 
  storage,
        fileFilter: (req, file, cb) => {
            console.log("Archivo recibido:", file);
            cb(null, true);
        }
 });



module.exports = upload;
}catch (error){
  console.error('Error en la configuración de multer:', error);
}

  