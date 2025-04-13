import app from './app.js';
import { PORT } from './src/config/index.js';

app.listen(PORT, () => {
  console.log('server is listening at 3000');
});
