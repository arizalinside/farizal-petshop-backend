const SalesModel = require("../models/sales");
const ProductModel = require("../models/product");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.createSales = async (req, res) => {
  try {
    const { product_id, quantity, product_price } = req.body;

    // check product exists in database
    const product = await ProductModel.getProductById(product_id);
    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    // get product_name and capital_price from product
    const product_name = product.product_name;
    const capital_price = product.capital_price;

    // calculate profit
    const profit = (product_price - capital_price) * quantity;

    // save sales to database
    const salesData = { product_id, product_name, quantity, product_price, capital_price, profit };
    const newSales =  await SalesModel.createSales(salesData);

    return successResponse(res, { id: newSales.insertId, ...salesData }, 201);
  } catch (error) {
    console.log("error: ", error);
    return errorResponse(res, error);
  }
}