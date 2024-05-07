const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const CanProfile = require('../models/canProfileModel')
const path = require('path')
const fs = require('fs')


// @desc    create candidate profile
// @route   POST /api/profile
// @access  Private
// Controlador para crear el perfil del candidato
const createCanProfile = asyncHandler(async (req, res) => {
  try {
    // El registro dispara un createProfile que se crea con el código de usuario unicamente.

    // Crear el perfil del candidato
    const newProfile = await CanProfile.create({
      user: req.user.id
    });

    res.status(201).json(newProfile);
  } catch (error) {
    console.log('error al crear perfil: ', error);
    res.status(500).json({ error: 'Error al crear el perfil' });
  }
});

// @desc    update candidate profile
// @route   PUT /api/profile
// @access  Private
// Controlador para actualizar el perfil del candidato
const updateCanProfile = asyncHandler(async (req, res) => {
  try {
    // Los datos del formulario y la imagen subida estarán disponibles en 'req.body' y 'req.file'
    const { tipoDoc, doc, phone, lang, nationality, genre, age, disability, diagnosis, country, city, postalCode, address, experience,  nivEduc, professionalProfile } = req.body;
    console.log("controller: ", req.body);


    // Obtener el perfil actual
    let profile = await CanProfile.findOne({ user: req.user.id });


    // Obtener  ruta relativa después de la carpeta 'uploads'
    let relativePath = "";
    let fileName = "";
    if (req.file) {
      console.log(req.file)
      relativePath = process.env.SERVER + "uploads" + req.file.path.split('uploads')[1];
      fileName = req.file.filename;
      
      // Si el perfil ya tiene información en el campo resume, agregamos un nuevo objeto
    if (profile.resume && profile.resume.length > 0) {
      profile.resume.push({ fileName, relativePath });
    } else {
      // Si no hay información en el campo resume, lo inicializamos con un array que contiene el nuevo objeto
      profile.resume = [{ fileName, relativePath }];
    }
    }

    
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    

    // Actualizar el perfil del candidato con el resto de los datos
    profile.tipoDoc = tipoDoc;
    profile.doc = doc;
    profile.phone = phone;
    profile.lang = lang;
    profile.nationality = nationality;
    profile.genre = genre;
    profile.age = age;
    profile.disability = disability;
    profile.diagnosis = diagnosis;
    profile.country = country;
    profile.city = city;
    profile.postalCode = postalCode;
    profile.address = address;
    profile.nivEduc = nivEduc;
    profile.experience = experience;
    profile.professionalProfile = professionalProfile;

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.log('error al actualizar perfil: ', error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
});


// @desc    Get user profile
// @route   GET /api/profile/
// @access  Private
const getCanProfile = asyncHandler(async (req,res) => {
  // Get works using id in the JWT
  const profile = await CanProfile.findOne({user:req.user.id})

  if(!profile){
      res.status(401)
      throw new Error('User havent got profile')
  }

  res.status(200).json(profile)
})

// @desc    Del CV file from a user profile
// @route   GET /api/profile/
// @access  Private
const delCvFile = asyncHandler(async (req,res) => {
  try {
    // Buscar el perfil del usuario
    const profile = await CanProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    // Encontrar el índice del archivo en el array "resume"
    const index = profile.resume.findIndex(item => item._id.toString() === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Archivo no encontrado en el perfil' });
    }

    // Obtener la ruta del archivo relativa al directorio de uploads
    const filePath = path.join(__dirname, '..', 'uploads', profile.resume[index].relativePath.split('uploads')[1]);

    // Eliminar el archivo del sistema de archivos
    fs.unlinkSync(filePath);

    // Eliminar el archivo del array "resume"
    profile.resume.splice(index, 1);

    // Guardar el perfil actualizado
    await profile.save();

    res.status(200).json({ message: 'Archivo eliminado correctamente', profile });
  } catch (error) {
    console.log('Error al eliminar el archivo:', error);
    res.status(500).json({ error: 'Error al eliminar el archivo' });
  }
  
})

  
  module.exports = {
    createCanProfile,
    updateCanProfile,
    getCanProfile,
    delCvFile
  };