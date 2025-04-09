const express = require('express');
const router = express.Router();
const { createCourse,getCompletedCourse, getCourses} = require('../controllers/CourseController');


router.post('/create', createCourse);
router.post('/getCompletedCourse', getCompletedCourse);
router.get('/getCourses/:userId', getCourses);

module.exports = router;
