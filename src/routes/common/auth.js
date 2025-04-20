const express = require('express');
const authcontroller = require('@controllers/auth.controller');

const router = express.Router();

router.post('/login', authcontroller.login);
router.post('/signup', authcontroller.signup);

module.exports = router;
