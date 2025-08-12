const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product");
const auth = require("../middlewares/authMiddleware");

router.get("/products", auth, ProductController.getProducts);
router.get("/products/:id", auth, ProductController.getProductById);
router.post("/products", auth, ProductController.createProduct);
router.put("/products/:id", auth, ProductController.updateProduct);
router.delete("/products/:id", auth, ProductController.deleteProduct);

module.exports = router;
