const router = require('express').Router();
const { success } = require('../../utils');
const adminCourse = require('./admin.courses');

router.get('/', (req, res) => {
  success(res, 200, 'some message', 'perfectly hitting routes');
});

router.use('/courses', adminCourse.router);

module.exports = { router };
