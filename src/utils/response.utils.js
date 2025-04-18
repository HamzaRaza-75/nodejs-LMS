const success = (res, code, message, data = {}) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

const error = (
  res,
  code = 400,
  message = 'Some error happened',
  err = 'something went wrong'
) => {
  return res.status(code).json({
    success: false,
    message: message,
    error: err,
  });
};

module.exports = { success, error };
