const router = require('express').Router();
const adminRoutes = require('./admin/admin');
const authroutes = require('@routes/common/auth.route');
const { success } = require('@utils');

router.get('/', (req, res) => {
  return success(res, 200, 'Route hitting successfully', 'some data');
});

router.use('/auth', authroutes);

router.use('/admin', adminRoutes);

module.exports = router;
