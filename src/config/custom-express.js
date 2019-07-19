const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const accountRoutes = require('../app/routes/account-routes');
accountRoutes(app);

const transactionRoutes = require('../app/routes/transaction-routes');
transactionRoutes(app);

const categoryRoutes = require('../app/routes/category-routes');
categoryRoutes(app);

module.exports = app;