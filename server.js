const app = require('./app').app;
const { PORT, corsOptions } = require('./src/config');
const cors = require('cors');
const dbConnection = require('./src/app/services/dbconnect');
const rootroutes = require('./src/routes/root.routes');

app.use(
  '/api',
  (req, res, next) => {
    console.log(req.originalUrl);
    next();
  },
  rootroutes
);

app.use(cors()); //here we have to configure the cors options which are already imported on up
dbConnection();

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
