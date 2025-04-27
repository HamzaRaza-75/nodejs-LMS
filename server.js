const { app } = require('./app'); // Import the app that now includes the cluster logic
const cors = require('cors');
const dbConnection = require('@services/dbconnect');
const rootroutes = require('@routes/root.routes');

// Middleware and routes
app.use(cors());
app.use('/api', rootroutes);
dbConnection();

// No need to call app.listen here — it's already called in the worker process in app.js
