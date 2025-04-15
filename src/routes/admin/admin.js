import express from 'express';
import { success } from '../../utils/index.js';
import adminCourse from './admin.courses.js';

const router = express.Router();

router.get('/', (req, res) => {
  success(res, 200, 'some message', 'perfectly hitting routes');
});

router.use('/courses', adminCourse);

export default router;
