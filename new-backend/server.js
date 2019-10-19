import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const routes = require('./routes.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.init(app);

app.use('/', express.Router());

app.listen(8080, () => console.log('Express server running on port 8080'));

