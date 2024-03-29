const express = require('express');
const cors = require('cors');

const { productsRoute, salesRoute, sellersRoute, usersRoute } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use(productsRoute);
app.use(salesRoute);
app.use(sellersRoute);
app.use(usersRoute);

app.use(errorMiddleware);

module.exports = app;
