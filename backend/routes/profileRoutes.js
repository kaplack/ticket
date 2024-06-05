const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerMiddleware')

const {protect} = require('../middleware/authMiddleware')
const { createCanProfile, getCanProfile, updateCanProfile, delCvFile, createEmpProfile, updateEmpProfile, getEmpProfile, getEmpAllProfile } = require('../controllers/profileController')

//ruta para crear o actualizar el perfil del candidato
router.route("/candidate/").post(protect, createCanProfile )
router.route("/candidate/").get(protect, getCanProfile )
router.route("/candidate/").put(protect, upload.single('resume'), updateCanProfile )
router.route("/candidate/:id").delete(protect, delCvFile )

//ruta para crear o actualizar el perfil de la empresa

router.route("/employer").post(protect, createEmpProfile);
router.route("/employer").get(protect, getEmpProfile);
router.route("/allemployers").get(getEmpAllProfile);
router.route("/employer").put(protect,upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), updateEmpProfile);



module.exports = router