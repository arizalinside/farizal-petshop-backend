const db = require("../config/database");

const UserModel = {
  // Get user by username
  getUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username = ? LIMIT 1",
        [username],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  },

  // Update last_login column
  updateLastLogin: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET last_login = NOW() WHERE id = ?",
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },
};

module.exports = UserModel;
