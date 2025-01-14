const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const Product = require('../models/product');

router.get('/products', ProductController.getProducts);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;