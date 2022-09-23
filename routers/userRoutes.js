
const express = require('express')
const router = express.Router()
const {isAuthValid} = require('../middlewares/isAuthValid')
const {
    allUsers,
    currentUser,
    registerUser,
    loginUser,
  } = require('../controllers/usercontroller')

  router.get('/all-users', allUsers)
  router.get('/current-user' , isAuthValid , currentUser)
  router.post('/register-user', registerUser)
  router.post('/login-user',loginUser )

module.exports = router 
