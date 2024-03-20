const express = require('express'); 
const router = express.Router();
const {CheckView , toggleLike, GetAllViews} = require("../controllers/viewController");

router.post('/check_view', CheckView);
router.post('/toggleLike' , toggleLike);
router.get('/getviews', GetAllViews)

module.exports = router;