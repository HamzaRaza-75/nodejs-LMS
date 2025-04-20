const express = require('express');
const roles = require('@controllers/troubleshoot/createroles');

const router = express.Router();

router.get('/createroles', roles.storeRoles);

module.exports = router;
