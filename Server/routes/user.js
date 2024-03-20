const express= require('express');
const router = express.Router();
const {Register, GetUsers, GetUser, DeleteUser, UpdateUser, Login, AddUser, ValidateUser, GetPopular} = require('../controllers/userController'); 
const {validation, registerValidate} = require('../middleware/validateUser');
const {IsAuth} = require('../middleware/auth')
const { cloudinary, signUpload } = require('../config/cloudinary');
const sig = signUpload();
/*
@method: POST
@ path:http:localhost:5000/api/user/register
@ parameter: req.body  
public
*/
router.post('/AddUser', registerValidate(), validation, AddUser);
router.post('/register', registerValidate(), validation, Register);
router.get('/getUsers', GetUsers);
router.get('/getUser/:id', GetUser);
router.get('/popular' , GetPopular);
router.delete('/deleteUser/:id', DeleteUser);
router.put('/UpdateUser/:id', UpdateUser );
router.post('/login', Login);
router.get('/current', IsAuth);
router.put('/validateUser/:id', ValidateUser);




module.exports = router;