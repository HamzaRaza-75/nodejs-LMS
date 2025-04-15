import express from 'express';
import adminRoutes from './admin/admin.js';
import { success } from '../utils/response.utils.js';

const router = express.Router();

router.use('/', (req, res) => {
  success(res, 200, 'Route hitting successfully', 'some data');
});
router.use('/admin', adminRoutes);

export default router;
