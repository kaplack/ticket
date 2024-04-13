const express = require('express')
const router = express.Router()
const {  getAllWorks, getPublicWork} = require('../controllers/workController')

router.route('/').get(getAllWorks)
router.route('/:id').get(getPublicWork)

module.exports = router