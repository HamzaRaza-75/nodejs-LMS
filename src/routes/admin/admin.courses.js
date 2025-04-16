const router = require('express').Router();
const { success } = require('../../utils');

router.get('/', (req, res) => {
  success(res, 200, 'courses Fetched Successfully', 'some data');
});

module.exports = { router };
