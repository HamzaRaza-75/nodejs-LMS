const express = require('express');
const adminDashboard = require('@controllers/admin/admin.dashboard.controller');

const router = express.Router();

router.get('/', adminDashboard.get);

module.exports = router;
