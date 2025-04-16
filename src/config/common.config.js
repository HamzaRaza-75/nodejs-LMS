const env = process.env;

const PORT = env.PORT || '3000';
const NODE_ENV = env.NODE_ENV || 'development';

//database connection url
const DATABASE_CONNECTION =
  env.DATABASE_CONNECTION || 'mongodb://127.0.0.1:27017/fcwebapplms';

// cors options
const corsOptions = {
  origin: env.BACKEND_ORIGIN || 'http://example.com',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const checkstatus = env.NODE_ENV === 'development' ? true : false;

module.exports = {
  checkstatus,
  corsOptions,
  DATABASE_CONNECTION,
  NODE_ENV,
  PORT,
};
