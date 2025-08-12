const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return errorResponse(
        res,
        "Nama pengguna atau kata sandi harus diisi",
        400
      );
    }

    // Find user by email
    const user = await UserModel.getUserByUsername(username);
    if (!user) {
      return errorResponse(
        res,
        "Nama pengguna atau kata sandi tidak valid",
        401
      );
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(
        res,
        "Nama pengguna dan kata sandi tidak valid",
        401
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Update last login
    await UserModel.updateLastLogin(user.id);

    return successResponse(res, {
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return errorResponse(res, "Terjadi kesalahan server", 500);
  }
};
