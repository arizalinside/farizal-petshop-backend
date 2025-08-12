const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/responseHandler");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return errorResponse(res, "Access denied, token missing", 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return errorResponse(res, "Invalid or expired token", 403);
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("JWT verification error:", error);
    return errorResponse(res, "Internal Server Error", 500);
  }
};
