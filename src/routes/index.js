const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');

router.use('/api', productRoutes);

module.exports = router;