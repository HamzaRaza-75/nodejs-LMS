const success = (res, code, message, data = {}) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

const error = (res, code = 400, message = 'Some error happened', err = {}) => {
  return res.status(code).json({
    success: false,
    message,
    error: typeof err === 'object' && err.message ? err.message : err,
  });
};

module.exports = { success, error };
