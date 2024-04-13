const express = require('express')
const router = express.Router()
const { getWorks, getWork, createWorks, updateWork, deleteWork, getAllWorks, getPublicWork} = require('../controllers/workController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getWorks).post(protect, createWorks)

router.route('/:id').get(protect, getWork).put(protect, updateWork).delete(protect, deleteWork)

router.route('/all').get(getAllWorks)
router.route('/all/:id').get(getPublicWork)

module.exports = router