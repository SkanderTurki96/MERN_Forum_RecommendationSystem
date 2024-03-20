const express= require('express');
const router = express.Router();
const {AddTags , GetTags, GetTag, DeleteTag, AddPostToTags, GetTagById} = require('../controllers/tagsController')


router.post('/addtag', AddTags);
router.get('/getAllTags', GetTags);
router.get('/gettag/:tags', GetTag);
router.delete('/delete/:name', DeleteTag);
router.put('/addTagToPost/:_id', AddPostToTags);
router.get('/GetTagById/:id',GetTagById );


module.exports = router;