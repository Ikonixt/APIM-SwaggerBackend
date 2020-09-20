const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const controller = require('./controllers');
const app = express();
const port = process.env.SERVER_PORT;
const proxy = require('./proxy/proxyConfig');
const mongodb = require('./db/mongodb');

app.use(cors());
app.options('*',cors());
app.use('/_swagger', bodyParser.json());
app.use('/_swagger', bodyParser.urlencoded({ extended: true }));
app.use('/_swagger', controller);
app.use(proxy);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
    mongodb();
});

