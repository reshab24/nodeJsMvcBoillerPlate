const express = require('express')
const router = express.Router()
const userController=require('./controller');
// Creating one
router
.route('/')
.get(userController.getallUsers)
.post(userController.authenticateToken,userController.createUser)


router
.route('/:id')
.get(userController.getUser)
.patch(userController.authenticateToken,userController.patchUserData)
.delete()

module.exports = router