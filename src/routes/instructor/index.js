const express = require('express');
const dashboardController = require('@controllers/instructor/instructor.dashboard.controller');
const courseRoute = require('@routes/instructor/instructor.course.js');

const router = express.Router();

router.get('/dashboard', dashboardController.get);
router.use('/course', courseRoute);
// router.get('/:id', controllerName.view);
// router.put('/:id', controllerName.update);
// router.delete('/:id', controllerName.remove);

module.exports = router;
