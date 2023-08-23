const express = require('express')
const router = express.Router()
const { registerUser, loginUser,getUserData } = require('../controllers/usersContollers')
const {protect} = require('../middleware/authMiddleware')


router.post('/', registerUser)
router.post('/login', loginrUser)
router.get('/getMe', protect, getUser)

module.exports = router