const express = require('express');
const dashboardController = require('@controllers/instructor/instructor.dashboard.controller');

const router = express.Router();

router.get('/dashboard', dashboardController.get);
// router.post('/', controllerName.store);
// router.get('/:id', controllerName.view);
// router.put('/:id', controllerName.update);
// router.delete('/:id', controllerName.remove);

module.exports = router;
