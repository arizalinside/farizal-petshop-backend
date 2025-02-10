const db = require('../config/database');

const Product = {
  getAllProducts: async () => {
    const [rows] = await db.query('SELECT * FROM products WHERE deleted_at IS NULL');
    return rows;
  },

  getProductsWithPagination: async (limit, offset) => {
    const [rows] = await db.query('SELECT * FROM products WHERE deleted_at IS NULL LIMIT ? OFFSET ? ', [limit, offset]);
    const [[{ total }]] = await db.query('SELECT COUNT (*) AS total FROM products WHERE deleted_at IS NULL')
    return { data: rows, total };
  },

  getProductById: async (id) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ? AND deleted_at IS NULL', [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  createProduct: async (data) => {
    const { product_name, product_price, capital_price, profit } = data;

    const query = `
      INSERT INTO products
      (product_name, product_price, capital_price, profit, created_at, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const [result] = await db.query(query, [
      product_name,
      product_price,
      capital_price,
      profit
    ]);

    return result;
  },

  updateProduct: async (data) => {
    const { id, product_name, product_price, capital_price, profit } = data;

    const query = `
      UPDATE products
      SET
        product_name = ?,
        product_price = ?,
        capital_price = ?,
        profit = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await db.query(query, [
      product_name,
      product_price,
      capital_price,
      profit,
      id
    ]);

    return result;
  },

  deleteProduct: async (id) => {
    const query = `
      UPDATE products
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL
    `;

    const [result] = await db.query(query, [id]);

    return result;
  }
};

module.exports = Product;