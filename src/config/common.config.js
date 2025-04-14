const env = process.env;

export const PORT = env.PORT || '3000';
export const NODE_ENV = env.NODE_ENV || 'development';
export const corsOptions = {
  origin: env.BACKEND_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
