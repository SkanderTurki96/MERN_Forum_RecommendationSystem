const express = require('express'); 
const router = express.Router();
const {CreatePost , getall, getOne, recomondedPost, ValidatePost, DeletePost, train} = require ('../controllers/postController');

router.post('/CreatePost', CreatePost);
router.get('/GetAll' , getall);
router.get('/getOne/:id', getOne);
router.get('/train', train);
router.put('/ValidatePost/:id', ValidatePost);
router.delete('/DeletePost/:id', DeletePost);
router.get('/getrecomended/:id' ,recomondedPost );

module.exports = router;