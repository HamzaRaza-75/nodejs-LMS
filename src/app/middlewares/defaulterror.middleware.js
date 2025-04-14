import { NODE_ENV } from '../../config/index.js';

export function errorHandler(err, req, res, next) {
  console.error('💥 Error:', err.stack); // shows file + line number

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: NODE_ENV === 'development' ? err.stack : undefined,
  });
}
