const env = process.env;

export const PORT = env.PORT || '3000';
export const NODE_ENV = env.NODE_ENV || 'development';

//database connection url
export const DATABASE_CONNECTION =
  env.DATABASE_CONNECTION || 'mongodb://127.0.0.1:27017/fcwebapplms';

// cors options
export const corsOptions = {
  origin: env.BACKEND_ORIGIN || 'http://example.com',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const checkstatus = env.NODE_ENV === 'development' ? true : false;
