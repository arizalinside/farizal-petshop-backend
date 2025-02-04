const express = require('express');
const router = express.Router();
const SalesController = require("../controllers/sales");

router.post('/sales', SalesController.createSales);

module.exports = router;