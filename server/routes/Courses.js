const express = require('express');
const router = express.Router();
const { createCourse,getCompletedCourse} = require('../controllers/CourseController');


router.post('/create', createCourse);
router.post('/getCompletedCourse', getCompletedCourse);

module.exports = router;
