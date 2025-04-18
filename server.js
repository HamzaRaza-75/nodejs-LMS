const app = require('./app').app;

const { PORT, corsOptions } = require('@config');
const cors = require('cors');
const dbConnection = require('@services/dbconnect');
const rootroutes = require('@routes/root.routes');

app.use(
  '/api',
  (req, res, next) => {
    winston.error('some error is comming');
    next();
  },
  rootroutes
);

app.use(cors()); //here we have to configure the cors options which are already imported on up
dbConnection();

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
