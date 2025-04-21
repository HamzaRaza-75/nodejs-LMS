const express = require('express');
const adminDashboard = require('@controllers/admin/admin.dashboard.controller');

const router = express.Router();

router.get('/', adminDashboard.get);
// router.post('/', controllerName.store);
// router.get('/:id', controllerName.view);
// router.put('/:id', controllerName.update);
// router.delete('/:id', controllerName.remove);

module.exports = router;
