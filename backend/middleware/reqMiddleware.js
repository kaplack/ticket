const asyncHandler = require('express-async-handler')

// Middleware para registrar la solicitud entrante
const reqMiddleware = asyncHandler(async(req, res, next) => {
    console.log('Solicitud recibida:');
    console.log('Cuerpo:', req.body);
    console.log('Archivos:', req.files); // Esto es específico de Multer
  
    next(); // Pasar al siguiente middleware o controlador
  });
  
//   // Agregar middleware de registro a la ruta relevante
//   app.post('/tu-ruta', logRequest, (req, res) => {
//     // Tu lógica de manejo de la solicitud aquí
//   });
module.exports = reqMiddleware;