const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const  Grid  = require('gridfs-stream');

// Conexión a MongoDB
const conn = mongoose.connection;

let gfs;
conn.once('open', () => {
  // Inicializar stream GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


try{

const storage = new GridFsStorage({
    db: conn,
    file: (req, file) => {
      return {
        filename: file.originalname,
        bucketName: 'uploads'
      };
    }
  });
  const upload = multer({ storage });

module.exports = upload;
}catch (error){
  console.error('Error en la configuración de multer:', error);
}

  