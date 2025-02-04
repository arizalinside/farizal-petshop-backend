const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const salesRoutes = require("./salesRoutes");

router.use('/api', productRoutes);
router.use('/api', salesRoutes);

module.exports = router;