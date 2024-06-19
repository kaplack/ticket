const express = require('express')
const router = express.Router()
const { registerUser, updateUser ,loginUser, getMe } = require('../controllers/userController')
const upload = require('../middleware/multerMiddleware')
const reqMiddleware = require('../middleware/reqMiddleware')

const {protect} = require('../middleware/authMiddleware')


router.post('/', registerUser)
//router.put('/:id', upload.single('picture'), updateUser)

router.post('/login', loginUser)

router.get('/me',protect, getMe )

module.exports = router