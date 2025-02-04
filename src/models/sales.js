const db = require("../config/database");

const Sales = {
  createSales: async ({ id, product_name, quantity, product_price, capital_price, profit }) => {
    const query = `
      INSERT INTO sales (id, product_name, quantity, product_price, capital_price, profit)
      VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [id, product_name, quantity, product_price, capital_price, profit];
    const [result] = await db.query(query, values);
    return result;
  }
};

module.exports = Sales;