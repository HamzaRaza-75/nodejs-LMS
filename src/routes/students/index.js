const express = require('express');
const studentDashboard = require('@controllers/student/student.dashboard.controller');

const router = express.Router();

router.get('/dashboard', studentDashboard.get);
// router.post('/', controllerName.store);
// router.get('/:id', controllerName.view);
// router.put('/:id', controllerName.update);
// router.delete('/:id', controllerName.remove);

module.exports = router;
