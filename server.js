import app from './app.js';
import { PORT, corsOptions } from './src/config/index.js';
import cors from 'cors';
import { dbConnection } from './src/app/services/dbconnect.js';
import rootroutes from './src/routes/root.routes.js';

app.use('/api', rootroutes);

app.use(cors()); //here we have to configure the cors options which are already imported on up
// app.use('/api');
dbConnection();

app.listen(PORT, () => {
  console.log('server is listening at 3000');
});
