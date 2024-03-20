const express = require('express');
const router = express.Router();
const {CreateTheme , UpdateTheme , GetTheme} = require('../controllers/themeController');

router.post('/createTheme', CreateTheme);
router.get('/getTheme', GetTheme);
router.put('/updateTheme/:id', UpdateTheme);

module.exports = router;