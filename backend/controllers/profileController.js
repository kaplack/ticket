// BOTH PROFILES CONTROLLERS

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const CanProfile = require("../models/canProfileModel");
const EmpProfile = require("../models/empProfileModel");
const CanResume = require("../models/canResumeModel");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");

// ---------------------------------------------------------------- CANDIDATE CONTROLLER

// @desc    create candidate profile
// @route   POST /api/profile
// @access  Private
// Controlador para crear el perfil del candidato
const createCanProfile = asyncHandler(async (req, res) => {
  try {
    // El registro dispara un createProfile que se crea con el código de usuario unicamente.

    // Crear el perfil del candidato
    const newProfile = await CanProfile.create({
      user: req.user.id,
    });

    res.status(201).json(newProfile);
  } catch (error) {
    console.log("error al crear perfil: ", error);
    res.status(500).json({ error: "Error al crear el perfil" });
  }
});

// @desc    update candidate profile
// @route   PUT /api/profile
// @access  Private
// Controlador para actualizar el perfil del candidato
const updateCanProfile = asyncHandler(async (req, res) => {
  try {
    // Los datos del formulario y la imagen subida estarán disponibles en 'req.body' y 'req.file'
    const {
      name,
      lastName,
      tipoDoc,
      doc,
      phone,
      lang,
      nationality,
      genre,
      age,
      disability,
      diagnosis,
      country,
      city,
      postalCode,
      address,
      experience,
      nivEduc,
      professionalProfile,
      socials,
    } = req.body;
    console.log("controller: ", req.body);

    // Obtener el perfil actual
    let profile = await CanProfile.findOne({ user: req.user.id });

    // Obtener  ruta relativa después de la carpeta 'uploads'
    let relativePath = "";

    if (req.file) {
      relativePath = req.file.location;
      //console.log(relativePath);
    }

    if (!profile) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    // Convertir age a una instancia de Date
    const isValidDate = (d) => d instanceof Date && !isNaN(d);
    let ageDate = new Date(age);
    //  if (!isValidDate(ageDate)) {
    //      return res.status(400).json({ error: 'Invalid date format for age' });
    //  }

    // Actualizar el perfil del candidato con el resto de los datos
    if (name !== undefined) profile.name = name;
    if (lastName !== undefined) profile.lastName = lastName;
    if (tipoDoc !== undefined) profile.tipoDoc = tipoDoc;
    if (doc !== undefined) profile.doc = doc;

    if (lang !== undefined && lang.length > 0) {
      profile.lang = JSON.parse(lang); // Convertir el JSON string de vuelta a un array
    }
    if (nationality !== undefined) profile.nationality = nationality;
    if (genre !== undefined) profile.genre = genre;
    if (age !== undefined && isValidDate(ageDate)) {
      profile.age = ageDate;
    }
    if (disability !== undefined) profile.disability = disability;
    if (diagnosis !== undefined) profile.diagnosis = diagnosis;
    if (country !== undefined) profile.country = country;
    if (city !== undefined) profile.city = city;

    if (address !== undefined) profile.address = address;
    if (nivEduc !== undefined) profile.nivEduc = nivEduc;
    if (experience !== undefined) profile.experience = experience;
    if (professionalProfile !== undefined)
      profile.professionalProfile = professionalProfile;
    if (socials !== undefined) profile.socials = JSON.parse(socials);
    if (relativePath) profile.profilePicture = relativePath;

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.log("error al actualizar perfil: ", error);
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
});

// @desc    Get user profile
// @route   GET /api/profile/
// @access  Private
const getCanProfile = asyncHandler(async (req, res) => {
  // Get works using id in the JWT
  const userId = req.params.userId || req.user.id;

  const profile = await CanProfile.findOne({ user: userId });

  if (!profile) {
    res.status(401);
    throw new Error("User havent got profile");
  }

  res.status(200).json(profile);
});

// @desc    Del CV file from a user profile
// @route   GET /api/profile/
// @access  Private
const delCvFile = asyncHandler(async (req, res) => {
  // Configura AWS S3
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  try {
    const { fileId } = req.params; // ID del archivo a eliminar
    const resume = await CanResume.findOne({ user: req.user.id });

    if (!resume) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    // Buscar el archivo en el array cv_file
    const fileIndex = resume.cv_file.findIndex(
      (file) => file._id.toString() === fileId
    );

    if (fileIndex === -1) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    const fileToDelete = resume.cv_file[fileIndex];

    // Eliminar de AWS S3
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileToDelete.fileName, // Nombre del archivo en S3
    };

    await s3.deleteObject(s3Params).promise();

    // Eliminar del array cv_file en la base de datos
    resume.cv_file.splice(fileIndex, 1);
    await resume.save();

    res.json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
    res.status(500).json({ error: "Error al eliminar el archivo" });
  }
});

// @desc    Del CV file from a user profile
// @route   GET /api/profile/
// @access  Private
const delProfilePicture = asyncHandler(async (req, res) => {
  // Configura AWS S3
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  try {
    console.log("delProfilePicture controller: ", req.body);
    const { fileKey } = req.body; // ID del archivo a eliminar
    console.log("fileKey: ", fileKey);

    // Eliminar de AWS S3
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey, // Nombre del archivo en S3
    };

    await s3.deleteObject(s3Params).promise();

    res.json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
    res.status(500).json({ error: "Error al eliminar el archivo" });
  }
});

// CANDIDATE /RESUME

// @desc    create user resume
// @route   GET /api/profile/candidate/resume
// @access  Private
const createResume = asyncHandler(async (req, res) => {
  //console.log(req.files)
  try {
    // El registro dispara un createProfile que se crea con el código de usuario unicamente.
    //const {keySkills, experiences, education} = req.body
    // Crear el perfil del candidato
    const newResume = await CanResume.create({
      user: req.user.id,
    });

    res.status(201).json(newResume);
  } catch (error) {
    console.log("error al crear CV: ", error);
    res.status(500).json({ error: "Error al crear el CV" });
  }
});

// @desc    update user resume
// @route   GET /api/profile/candidate/resume
// @access  Private
const updateResume = asyncHandler(async (req, res) => {
  //console.log(req.files)
  try {
    // Obtener el resume actual
    let resume = await CanResume.findOne({ user: req.user.id });
    //console.log("profileController", resume);
    // Obtener  ruta relativa después de la carpeta 'uploads'

    if (req.file) {
      console.log(req.file);
      const relativePath = req.file.location;
      const fileName = req.file.key;

      // Si el perfil ya tiene información en el campo resume, agregamos un nuevo objeto
      if (resume.cv_file && resume.cv_file.length > 0) {
        resume.cv_file.push({ fileName, relativePath });
      } else {
        // Si no hay información en el campo resume, lo inicializamos con un array que contiene el nuevo objeto
        resume.cv_file = [{ fileName, relativePath }];
      }
    }

    // El registro dispara un createProfile que se crea con el código de usuario unicamente.
    const { skills, experiences, education } = req.body;
    //console.log("profileController req.body", req.body);
    // Crear el perfil del candidato

    if (skills !== undefined) resume.skills = JSON.parse(skills);
    if (experiences !== undefined) resume.experiences = JSON.parse(experiences);
    if (education !== undefined) resume.education = JSON.parse(education);

    await resume.save(resume);

    res.status(201).json(resume);
  } catch (error) {
    console.log("error al actualizar CV: ", error);
    res.status(500).json({ error: "Error al actualizar el CV" });
  }
});

// @desc    Get user resume
// @route   GET /api/profile/candidate/resume
// @access  Private
const getCanResume = asyncHandler(async (req, res) => {
  const userId = req.params.userIdo || req.user.id;

  // Get works using id in the JWT
  const resume = await CanResume.findOne({ user: userId });

  if (!resume) {
    res.status(401);
    throw new Error("User havent got resume");
  }

  res.status(200).json(resume);
});

// ---------------------------------------------------------------- EMPLOYER CONTROLLER

const createEmpProfile = asyncHandler(async (req, res) => {
  //console.log(req.files)
  try {
    // El registro dispara un createProfile que se crea con el código de usuario unicamente.

    // Crear el perfil del candidato
    const newProfile = await EmpProfile.create({
      user: req.user.id,
    });

    res.status(201).json(newProfile);
  } catch (error) {
    console.log("error al crear perfil: ", error);
    res.status(500).json({ error: "Error al crear el perfil" });
  }
});

// @desc    update employer profile
// @route   PUT /api/profile/employer
// @access  Private
// Controlador para actualizar el perfil del candidato
const updateEmpProfile = asyncHandler(async (req, res) => {
  try {
    // Los datos del formulario y la imagen subida estarán disponibles en 'req.body' y 'req.file'
    const {
      companyName,
      tradeName,
      companyType,
      idNumber,
      email,
      phone,
      ownershipType,
      web,
      teamSize,
      estSince,
      country,
      department,
      province,
      address,
      purpose,
      goal,
      description,
      linkedin,
      facebook,
      instagram,
      twitter,
      whatsapp,
      youtube,
    } = req.body;
    //console.log(facebook, twitter)

    // Obtener el perfil actual
    let profile = await EmpProfile.findOne({ user: req.user.id });

    //Delete item gallery by id
    if (req.body.deletedGallery) {
      const fileToDelete = req.body.deletedGallery;
      console.log("fileToDelete: ", fileToDelete);

      profile.gallery = profile.gallery.filter(
        (file) => file.fileName !== fileToDelete
      );
      console.log("profile.gallery: ", profile.gallery);
    }
    // Obtener  ruta relativa después de la carpeta 'uploads'

    if (req.files) {
      console.log(req.files);
      const imgFiles = req.files;

      for (let key in imgFiles) {
        const files = imgFiles[key];

        if (key === "gallery") {
          // Asegúrate de no reemplazar la galería completa
          if (!profile.gallery) {
            profile.gallery = [];
          }

          for (const imgFile of files) {
            const relativePath = imgFile.location;
            const fileName = imgFile.key;
            profile.gallery.push({ fileName, relativePath });
          }
        } else {
          const imgFile = files[0];
          const relativePath = imgFile.location;
          const fileName = imgFile.key;

          if (key === "logo") {
            profile.logo = { fileName, relativePath };
          } else {
            profile.cover = { fileName, relativePath };
          }
        }
      }
    }

    if (!profile) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }
    // Actualizar el perfil del candidato con el resto de los datos
    if (companyName !== undefined) profile.companyName = companyName;
    if (tradeName !== undefined) profile.tradeName = tradeName;
    if (companyType !== undefined) profile.companyType = companyType;
    if (idNumber !== undefined) profile.idNumber = idNumber;
    if (email !== undefined) profile.email = email;
    if (phone !== undefined) profile.phone = phone;
    if (ownershipType !== undefined) profile.ownershipType = ownershipType;
    if (web !== undefined) profile.web = web;
    if (teamSize !== undefined) profile.teamSize = teamSize;
    if (estSince !== undefined) profile.estSince = estSince;
    if (country !== undefined) profile.country = country;
    if (department !== undefined) profile.department = department;
    if (province !== undefined) profile.province = province;
    if (address !== undefined) profile.address = address;
    if (purpose !== undefined) profile.purpose = purpose;
    if (goal !== undefined) profile.goal = goal;
    if (description !== undefined) profile.description = description;
    if (linkedin !== undefined) profile.linkedin = linkedin;
    if (facebook !== undefined) profile.facebook = facebook;
    if (instagram !== undefined) profile.instagram = instagram;
    if (twitter !== undefined) profile.twitter = twitter;
    if (whatsapp !== undefined) profile.whatsapp = whatsapp;
    if (youtube !== undefined) profile.youtube = youtube;
    //console.log(profile)
    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.log("error al actualizar perfil: ", error);
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
});

// @desc    Get user profile
// @route   GET /api/profile/
// @access  Private
const getEmpProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user.id;
  // Get works using id in the JWT
  const profile = await EmpProfile.findOne({ user: userId });

  if (!profile) {
    res.status(401);
    throw new Error("User havent got profile");
  }

  res.status(200).json(profile);
});

// @desc    Get all employers profiles
// @route   GET /api/profile/allemployers
// @access  Private
const getEmpAllProfile = asyncHandler(async (req, res) => {
  // Get works using id in the JWT
  const profiles = await EmpProfile.find();

  //joblist requerimiento
  const allProfilesSelection = [];
  profiles.map((item) => {
    const el = {
      user: item.user,
      companyName: item.companyName,
      web: item.web,
      logo:
        Array.isArray(item.logo) &&
        item.logo.length > 0 &&
        item.logo[0] &&
        item.logo[0].relativePath
          ? item.logo[0].relativePath
          : "",
      cover:
        Array.isArray(item.cover) &&
        item.cover.length > 0 &&
        item.cover[0] &&
        item.cover[0].relativePath
          ? item.cover[0].relativePath
          : "",
      tipo: item.compType,
    };
    allProfilesSelection.push(el);
  });

  res.status(200).json(allProfilesSelection);
});

module.exports = {
  createCanProfile,
  updateCanProfile,
  getCanProfile,
  delProfilePicture,
  delCvFile,
  createEmpProfile,
  updateEmpProfile,
  getEmpProfile,
  getEmpAllProfile,
  createResume,
  updateResume,
  getCanResume,
};
