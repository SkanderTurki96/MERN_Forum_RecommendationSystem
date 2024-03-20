const express= require('express');
const router = express.Router();
const {GetMostViewedPosts , getPostById} = require('../controllers/MediaController');

router.get('/getMostViewed', GetMostViewedPosts );
router.get('/getPostById/:id', getPostById)

module.exports = router;