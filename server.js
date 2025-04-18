const app = require('./app').app;

const { PORT, corsOptions } = require('@config');
const cors = require('cors');
const dbConnection = require('@services/dbconnect');
const rootroutes = require('@routes/root.routes');

app.use(
  '/api',
  (req, res, next) => {
    next();
  },
  rootroutes
);

app.use(cors());
dbConnection();

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
