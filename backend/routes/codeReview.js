const express = require('express');
const {
  reviewCode,
  explainCode,
  improveCode,
  getReviewHistory,
  deleteReview,
  getDashboardStats,
} = require('../controllers/codeReviewController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Review code
router.post('/review', reviewCode);

// Explain code
router.post('/explain', explainCode);

// Improve code
router.post('/improve', improveCode);

// Get review history
router.get('/history', getReviewHistory);

// Delete review
router.delete('/history/:id', deleteReview);

// Get dashboard stats
router.get('/dashboard', getDashboardStats);

module.exports = router;
