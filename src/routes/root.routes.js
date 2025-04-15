import express from 'express';
import adminRoutes from './admin/admin.js';
import { success } from '../utils/response.utils.js';

const router = express.Router();

router.get('/', (req, res) => {
  return success(res, 200, 'Route hitting successfully', 'some data');
});

console.log('this is hitting again');

router.use('/admin', adminRoutes);

export default router;
