import * as express from 'express';
import { Application } from 'express';

const bodyParser = require('body-parser');


const app: Application = express();

app.use(bodyParser);

app.listen(8090, () => {
  console.log('Server is working at Port 8090');
});

