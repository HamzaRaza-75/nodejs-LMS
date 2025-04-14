import app from './app.js';
import { PORT, corsOptions } from './src/config/index.js';
import cors from 'cors';

app.use(cors());

app.listen(PORT, () => {
  console.log('server is listening at 3000');
});
