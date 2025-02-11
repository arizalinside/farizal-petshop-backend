const db = require("../config/database");

const Sales = {
  getAllSales: async () => {
    const [rows] = await db.query("SELECT * FROM sales WHERE deleted_at IS NULL");
    return rows;
  },

  getSalesWithPagination: async (limit, offset) => {
    const [rows] = await db.query('SELECT * FROM sales WHERE deleted_at IS NULL LIMIT ? OFFSET ?', [limit, offset]);
    const [[{ total }]] = await db.query('SELECT COUNT (*) AS total FROM sales WHERE deleted_at IS NULL');
    return { data: rows, total };
  },

  createSales: async ({ id, product_name, quantity, product_price, capital_price, profit }) => {
    const query = `
      INSERT INTO sales (id, product_name, quantity, product_price, capital_price, profit)
      VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [id, product_name, quantity, product_price, capital_price, profit];
    const [result] = await db.query(query, values);
    return result;
  },

  updateSales: async (id, product_name, product_price, capital_price, quantity, profit) => {
    const query = `
    UPDATE sales
    SET
      product_name = ?,
      product_price = ?,
      capital_price = ?,
      quantity = ?,
      profit = ?
    WHERE id = ? AND deleted_at IS NULL`;
    const values = [id, product_name, product_price, capital_price, quantity, profit,];
    const [result] = await db.query(query, values);
    return result;
  },

  deleteSales: async (id) => {
    const query = `
    UPDATE sales
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = ? AND deleted_at IS NULL`;

    const [result] = await db.query(query, [id]);
    return result;
  }
};

module.exports = Sales;