const success = (res, code, message, data = {}) => {
  return res.status(code).json({
    success: true,
    message: message,
    data: data,
  });
};

const error = (
  res,
  code = 400,
  message = 'some error Happen',
  error = 'Error Happen'
) => {
  res.status(code).json({
    success: false,
    message: message,
    error: error.message(),
  });
};

export { error, success };
