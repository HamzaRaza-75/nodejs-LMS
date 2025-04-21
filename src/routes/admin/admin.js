const router = require('express').Router();
const { success } = require('@utils');
const adminDashboard = require('./admin.dashboard');
const adminCourse = require('./admin.courses');

router.get('/', (req, res) => {
  console.log(req);
  success(res, 200, 'some message', 'perfectly hitting routes');
});

router.use('/dashboard', adminDashboard);
router.use('/courses', adminCourse.router);

module.exports = router;
