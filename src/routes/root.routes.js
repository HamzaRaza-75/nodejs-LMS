const router = require('express').Router();
const adminRoutes = require('./admin/admin');
const { success } = require('../utils');

router.get('/', (req, res) => {
  return success(res, 200, 'Route hitting successfully', 'some data');
});

console.log('this is hitting again');

router.use('/admin', adminRoutes.router);

module.exports = router;
