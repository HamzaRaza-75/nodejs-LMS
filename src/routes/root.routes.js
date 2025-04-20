const router = require('express').Router();
const adminRoutes = require('@routes/admin/admin');
const authroutes = require('@routes/common/auth');
const helperRoutes = require('@routes/helper');
const { success } = require('@utils');

router.get('/', (req, res) => {
  return success(res, 200, 'Route hitting successfully', 'some data');
});

router.use('/auth', authroutes);

router.use('/admin', adminRoutes);

router.use('/helper', helperRoutes);

module.exports = router;
