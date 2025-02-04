const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(routes);
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Not Found' })
})

module.exports = app;