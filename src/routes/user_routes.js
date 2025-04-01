// ./routes/user_routes.js
const express = require("express");
const { login, register, getInfo, verifyOtp } = require("../controllers/user_controller");
const verifyToken = require("../middlewares/authMiddleware");
const limiter = require("../middlewares/rateLimitMiddleware");

const router = express.Router();

// Rutas de autenticación
router.post("/login", limiter, login);
router.post("/register", limiter, register);
router.get("/info", verifyToken, getInfo);
router.post("/verify-otp", verifyOtp);

module.exports = router;


