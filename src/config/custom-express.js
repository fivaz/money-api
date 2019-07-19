const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const routes = require('../app/infra/routes');
routes(app);

module.exports = app;