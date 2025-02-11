const SalesModel = require("../models/sales");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getSales = async (req, res) => {
  try {
    let { page, limit } = req.query;

    if (!page || !limit) {
      const data = await SalesModel.getAllSales();
      return successResponse(res, {
        totalItems: data.length,
        data
      })
    }

    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const { data, total } = await SalesModel.getSalesWithPagination(limit, offset);
    return successResponse(res, {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data
    });
  } catch (error) {
    console.log('error: ', error);
    return errorResponse(res, error);
  }
}

exports.getSalesById = async (req, res) => {
  try {
    const { id } = req.params;

    const sales = await SalesModel.getSalesById(id);
    if (!sales) {
      return errorResponse(res, 'Sales not found', 404);
    }

    return successResponse(res, product);
  } catch (error) {
    return errorResponse(res, error);
  }
}

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

exports.updateSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_price, capital_price, quantity } = req.body;

    if (!id) {
      return errorResponse(res, 'Sales ID is required', 400);
    }
    if (!quantity) {
      return errorResponse(res, 'Quantity is required', 400);
    }

    const profit = product_price - capital_price;
  } catch (error) {
    
  }
}