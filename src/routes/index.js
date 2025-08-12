const express = require("express");
const router = express.Router();
const productRoutes = require("./productRoutes");
const salesRoutes = require("./salesRoutes");
const authRoutes = require("./authRoutes");

router.use("/api", productRoutes);
router.use("/api", salesRoutes);
router.use("/api", authRoutes);

module.exports = router;
