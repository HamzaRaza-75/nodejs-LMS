const express = require('express');
const courseController = require('@controllers/instructor/instructor.course.controller');

const router = express.Router();

router.get('/', courseController.get);
router.post('/', courseController.store);
router.get('/:id', courseController.view);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.remove);

module.exports = router;
