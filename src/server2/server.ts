import * as express from 'express';
import { Application } from 'express';
import { apiGetUserThreads } from './api/apiGetUseThreads';

const bodyParser = require('body-parser');


const app: Application = express();

app.use(bodyParser.json());


apiGetUserThreads(app);


app.listen(8090, () => {
  console.log('Server is working at Port 8090');
});

