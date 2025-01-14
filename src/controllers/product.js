const Product = require('../models/product');
const ProductModel = require('../models/product');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getProducts = async (req, res) => {
  try {
    const data = await ProductModel.getAllProducts();
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

exports.createProduct = async(req, res) => {
  try {
    const { product_name, product_price, capital_price } = req.body;

    // Input validation
    if (!product_name || !product_price || !capital_price) {
      return errorResponse(res, 'All fields are required', 400);
    }

    // Calculate profit
    const profit = product_price - capital_price;

    // Save product to database
    const result = await ProductModel.createProduct({
      product_name,
      product_price,
      capital_price,
      profit
    });

    return successResponse(res, {
      id: result.insertId,
      product_name,
      product_price,
      capital_price,
      profit,
      created_at: new Date().toISOString(),
    }, 201);
  } catch (error) {
    console.log('Error creating product:', error);
    return errorResponse(res, 'Internal Server Error', 500);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, product_price, capital_price } = req.body;

    // Input validation
    if (!id) {
      return errorResponse(res, 'Product ID is required', 400);
    }
    if (!product_name || !product_price || !capital_price) {
      return errorResponse(res, 'All fields are required', 400);
    }

    // Recalculate profit
    const profit = product_price - capital_price;

    // Update product in database
    const result = await ProductModel.updateProduct({
      id,
      product_name,
      product_price,
      capital_price,
      profit
    });

    if (result.affectedRows === 0) {
      return errorResponse(res, 'Product not found or no changes made', 404);
    }

    return successResponse(res, {
      id,
      product_name,
      product_price,
      capital_price,
      profit
    }, 200);
  } catch (error) {
    console.error('Error updating product:', error);
    return errorResponse(res, 'Internal Server Error', 500);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ID Validation
    if (!id) {
      return errorResponse(res, 'Product ID is required', 400);
    }

    // Update product to indicate deletion (soft delete)
    const result = await Product.deleteProduct(id);

    if (result.affectedRows === 0) {
      return errorResponse(res, 'Product not found or already deleted', 404);
    }

    return successResponse(res, { message: 'Product deleted successfully' }, 200);
  } catch (error) {
    console.error('Error deleting product:', error);
    return errorResponse(res, 'Internal Server Error', 500);
  }
};