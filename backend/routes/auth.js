const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} = require('../validators/authValidator');

const router = express.Router();

// Register
router.post('/register', validateRegister, handleValidationErrors, register);

// Login
router.post('/login', validateLogin, handleValidationErrors, login);

// Get profile
router.get('/profile', authenticateToken, getProfile);

// Update profile
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
