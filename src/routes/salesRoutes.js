const express = require("express");
const router = express.Router();
const SalesController = require("../controllers/sales");
const auth = require("../middlewares/authMiddleware");

router.get("/sales", auth, SalesController.getSales);
router.post("/sales", auth, SalesController.createSales);

module.exports = router;
