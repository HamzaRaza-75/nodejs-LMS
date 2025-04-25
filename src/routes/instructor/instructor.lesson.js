const express = require('express');
const router = express.Router();
const lectureController = require('@controllers/instructor/instructor.lecture.controller');

router.get('/courses/:courseId/lectures', lectureController.get);
router.get('/lectures/:id', lectureController.view);
router.post('/courses/:courseId/lectures', lectureController.store);
router.put('/lectures/:id', lectureController.update);
router.delete('/lectures/:id', lectureController.remove);

module.exports = router;
