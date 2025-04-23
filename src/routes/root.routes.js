const router = require('express').Router();
const adminRoutes = require('@routes/admin/admin');
const instructorRoutes = require('@routes/instructor');
const authroutes = require('@routes/common/auth');
const helperRoutes = require('@routes/helper');
const { success } = require('@utils');
const { authMiddleware, roleCheck } = require('@middlewares/auth.middleware');

router.get('/', (req, res) => {
  return success(res, 200, 'Route hitting successfully', 'some data');
});

router.use('/auth', authroutes);

router.use('/admin', authMiddleware, roleCheck('admin'), adminRoutes);
router.use(
  '/instructor',
  authMiddleware,
  roleCheck('insturctor'),
  instructorRoutes
);

router.use('/helper', helperRoutes);

module.exports = router;
