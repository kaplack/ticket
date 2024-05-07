const express = require('express')
const router = express.Router()
const upload = require('../middleware/multerMiddleware')

const {protect} = require('../middleware/authMiddleware')
const { createCanProfile, getCanProfile, updateCanProfile, delCvFile } = require('../controllers/profileController')

//ruta para crear o actualizar el perfil del candidato
router.route("/").post(protect, createCanProfile )
router.route("/").get(protect, getCanProfile )
router.route("/").put(protect, upload.single('resume'), updateCanProfile )
router.route("/:id").delete(protect, delCvFile )

module.exports = router